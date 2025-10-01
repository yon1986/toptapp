import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Juego from "./pages/Juego";
import Ranking from "./pages/Ranking";
import Login from "./pages/Login";
function App() {
    const isLoggedIn = localStorage.getItem("worldID");
    return (_jsx(BrowserRouter, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/login", element: _jsx(Login, {}) }), _jsx(Route, { path: "/", element: isLoggedIn ? _jsx(Juego, {}) : _jsx(Navigate, { to: "/login" }) }), _jsx(Route, { path: "/ranking", element: isLoggedIn ? _jsx(Ranking, {}) : _jsx(Navigate, { to: "/login" }) })] }) }));
}
export default App;
