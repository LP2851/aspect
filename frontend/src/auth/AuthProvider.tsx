import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

import {
  useLogoutMutation,
  useMeLazyQuery,
  type User,
  useSignInMutation,
} from "../generated/graphql";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [signIn] = useSignInMutation();
  const [logoutMutation] = useLogoutMutation();
  const [fetchMe] = useMeLazyQuery();

  // On mount, check for session
  useEffect(() => {
    (async () => {
      const { data } = await fetchMe();
      if (
        data?.authenticatedItem &&
        data.authenticatedItem.__typename === "User"
      ) {
        setUser(data.authenticatedItem);
      } else {
        setUser(null);
      }
      setLoading(false);
    })();
  }, [fetchMe]);

  const login = async (email: string, password: string) => {
    const { data } = await signIn({ variables: { email, password } });
    if (
      data?.authenticateUserWithPassword?.__typename ===
      "UserAuthenticationWithPasswordSuccess"
    ) {
      setUser(data.authenticateUserWithPassword.item);
      return true;
    }
    return false;
  };

  const logout = async () => {
    await logoutMutation();
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
