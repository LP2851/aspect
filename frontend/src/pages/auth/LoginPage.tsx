import "./LoginPage.css";

import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router";

import { useAuth } from "../../auth/AuthProvider.tsx";
import Button from "../../components/button/Button.tsx";
import ErrorMessage from "../../components/error-message/ErrorMessage.tsx";
import TextInput from "../../components/input/text/TextInput.tsx";

const LoginPage = () => {
  const { user, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  if (user) return <Navigate to="/" replace />;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      navigate("/");
    } else {
      setErrorMessage("Invalid credentials");
    }
  };

  return (
    <div className="content">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <span
          className="title-gradient"
          style={{ textAlign: "center", cursor: "auto" }}
        >
          aspect
        </span>
      </div>
      <h1 className="card-h1">Login to your account</h1>
      <form onSubmit={handleLogin}>
        <TextInput
          id="email"
          inputType="email"
          autocomplete={false}
          label="Email address"
          value={email}
          placeholder="Enter your email address"
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextInput
          id="password"
          inputType="password"
          autocomplete={false}
          label="Password"
          value={password}
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <ErrorMessage message={errorMessage || ""} />

        <div className="btn-wrapper">
          <Button
            onClick={handleLogin}
            extraClasses="login-button"
            variant="fancy-primary"
          >
            Login
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
