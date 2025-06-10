import { Route, Routes } from "react-router";
import Home from "./pages/home/Home.tsx";
import Navbar from "./components/navbar/Navbar.tsx";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <div className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          {/*<Route path="/project/:projectId" element={<AppLayout/>}/>*/}
        </Routes>
      </div>
    </>
  );
}

export default App;
