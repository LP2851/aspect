import { useAuth } from "../../auth/AuthProvider.tsx";
import { useNavigate } from "react-router";
import UserStats from "./user-stats/UserStats.tsx";
import ManagedAccounts from "./managed-accounts/ManagedAccounts.tsx";
import ManagedAccountById from "./managed-account-by-id/ManagedAccountById.tsx";
import PageWithLeftSidebar from "../../components/page-with-left-sidebar/PageWithLeftSidebar.tsx";
import "./ProfilePage.css";

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const contentMapping = [
    {
      key: "profile",
      element: (
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
      ),
      itemName: "Profile",
      hidden: false,
    },
    {
      key: "managed-accounts",
      element: <ManagedAccounts />,
      itemName: "Managed Accounts",
      subElementMapping:
        user?.managedAccounts?.map((account) => {
          return {
            key: "managed-account_" + account.id,
            element: <ManagedAccountById managedAccountId={account.id} />,
            itemName: account.name,
            hidden: false,
          };
        }) || [],
      hidden: false,
    },
    // {
    //   key: "account-links",
    //   element: <AccountLinks />,
    //   itemName: "(OLD) Account Links",
    //   hidden: false,
    // },
    {
      key: "stats",
      element: <UserStats user={user} />,
      itemName: "Stats For Nerds",
      hidden: false,
    },
    {
      key: "logout",
      func: () => logout().then(() => navigate("/login")),
      itemName: "Logout",
      hidden: false,
    },
  ];

  return (
    <PageWithLeftSidebar
      // @ts-ignore
      contentMapping={contentMapping}
      defaultKey="profile"
      title="Profile"
      path="/profile"
    />
  );
};

export default ProfilePage;
