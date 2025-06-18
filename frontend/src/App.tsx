import { Route, Routes } from "react-router";
import Home from "./pages/home/Home.tsx";
import Navbar from "./components/navbar/Navbar.tsx";
import "./App.css";
import ProjectEditorPage from "./pages/projects/editor/ProjectEditorPage.tsx";

function App() {
  return (
    <>
      <Navbar />
      <div className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/project/:projectId"
            element={<ProjectEditorPage files={[]} />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
