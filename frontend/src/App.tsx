import "./App.css";

import { Route, Routes, useLocation } from "react-router";

import Navbar from "./components/navbar/Navbar.tsx";
import LoginPage from "./pages/auth/LoginPage.tsx";
import PrivateRoute from "./pages/helpers/PrivateRoute.tsx";
import Home from "./pages/home/Home.tsx";
import ProjectEditorPageV2 from "./pages/projects/editor2/ProjectEditorPageV2.tsx";
import ProjectsPage from "./pages/projects/list-page/ProjectsPage.tsx";
import ManagedAccountsPage from "./pages/managed-accounts/ManagedAccountsPage.tsx";
import ProfilePage from "./pages/profile/ProfilePage.tsx";
import ProjectDetailsPage from "./pages/projects/detail/ProjectDetailsPage.tsx";

function App() {
  const location = useLocation();
  const useNavBar = location.pathname !== "/login";

  return (
    <>
      {useNavBar && <Navbar />}
      <div className="main">
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/managed-accounts"
            element={
              <PrivateRoute>
                <ManagedAccountsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/projects/:projectId"
            element={
              <PrivateRoute>
                {/*<ProjectEditorPage files={[]} />*/}
                <ProjectDetailsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/test-project"
            element={
              <PrivateRoute>
                <ProjectEditorPageV2 />
              </PrivateRoute>
            }
          />
          <Route
            path="/projects"
            element={
              <PrivateRoute>
                <ProjectsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />
          {/*<Route*/}
          {/*  path="/test-profile"*/}
          {/*  element={*/}
          {/*    <PrivateRoute>*/}
          {/*      <ProfilePage />*/}
          {/*    </PrivateRoute>*/}
          {/*  }*/}
          {/*/>*/}
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
