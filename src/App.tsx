import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Juego from "./pages/Juego";
import Ranking from "./pages/Ranking";
import Login from "./pages/Login";

function App() {
  const isLoggedIn = localStorage.getItem("worldID");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={isLoggedIn ? <Juego /> : <Navigate to="/login" />} />
        <Route path="/ranking" element={isLoggedIn ? <Ranking /> : <Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
