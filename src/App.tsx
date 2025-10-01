import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Juego from "./pages/Juego";
import Ranking from "./pages/Ranking";
import Login from "./pages/Login";

function App() {
  // Revisa si hay sesión guardada (wallet autenticada)
  const isLoggedIn = (() => {
    try {
      const data = localStorage.getItem("worldID");
      if (!data) return false;
      const parsed = JSON.parse(data);
      // Validamos que exista la dirección del usuario
      return !!parsed.address;
    } catch {
      return false;
    }
  })();

  return (
    <BrowserRouter>
      <Routes>
        {/* Pantalla de login siempre accesible */}
        <Route path="/login" element={<Login />} />

        {/* Si está logueado → Juego, si no → redirige a login */}
        <Route
          path="/"
          element={isLoggedIn ? <Juego /> : <Navigate to="/login" />}
        />
        <Route
          path="/ranking"
          element={isLoggedIn ? <Ranking /> : <Navigate to="/login" />}
        />

        {/* Fallback: cualquier ruta no encontrada → login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
