import "./ProfilePage.css";

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

import { useAuth } from "../../auth/AuthProvider.tsx";
import AccountLinks from "./account-links/AccountLinks.tsx";

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedSection, setSelectedSection] = useState("profile");

  // Auto-select account-links section for OAuth redirects
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const success = urlParams.get("success");
    const error = urlParams.get("error");

    // If there are OAuth-related parameters, automatically select account-links section
    if (success || error) {
      setSelectedSection("account-links");
    }
  }, [location.search]);

  const renderContent = () => {
    switch (selectedSection) {
      case "generate-info":
        return <div>Generate Info Section (Placeholder)</div>;
      case "account-links":
        return <AccountLinks />;
      case "logout":
        logout().then(() => navigate("/login"));
        return null;
      default:
        return (
          <div className="user-details">
            <p>
              <strong>Name:</strong> {user?.name}
            </p>
            <p>
              <strong>Email:</strong> {user?.email}
            </p>
            {user?.isAdmin && (
              <p>
                <strong>Is Admin:</strong> True
              </p>
            )}
          </div>
        );
    }
  };

  return (
    <div className="profile-page-container">
      <aside className="profile-page-sidebar">
        <ul className="sidebar-menu">
          <li onClick={() => setSelectedSection("profile")}>Profile</li>
          <li onClick={() => setSelectedSection("generate-info")}>
            Generate Info
          </li>
          <li onClick={() => setSelectedSection("account-links")}>
            Account Links
          </li>
          <li onClick={() => setSelectedSection("logout")}>Logout</li>
        </ul>
      </aside>
      <main className="main-content">
        <h1>Profile</h1>
        {renderContent()}
      </main>
    </div>
  );
};

export default ProfilePage;
