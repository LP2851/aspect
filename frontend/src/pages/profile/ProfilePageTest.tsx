import PageWithLeftSidebar from "../../components/left-sidebar-test/PageWithLeftSidebar.tsx";
import {useAuth} from "../../auth/AuthProvider.tsx";
import {useLocation, useNavigate} from "react-router";

const contentMapping = [];


const ProfilePageTest = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  return <PageWithLeftSidebar
    defaultKey="profile"
    title="Profile"
    path="/test-profile"
    contentMapping={[
      {
        key: "profile",
        element: <div>Profile</div>,
        itemName: "Profile"
      }
    ]} />
}

export default ProfilePageTest;
