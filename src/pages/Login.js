import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { IDKitWidget } from "@worldcoin/idkit";
import { useNavigate } from "react-router-dom";
const app_id = import.meta.env.VITE_WORLD_ID_APP_ID;
const Login = () => {
    const navigate = useNavigate();
    const handleSuccess = (result) => {
        // guarda identidad mínima
        localStorage.setItem("playerName", result.nullifier_hash);
        localStorage.setItem("worldID", JSON.stringify(result));
        // al juego
        navigate("/");
    };
    // si falta la variable, muestra algo claro (no rompe build)
    if (!app_id) {
        return (_jsxs("div", { className: "flex flex-col items-center justify-center min-h-screen text-white bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600", children: [_jsx("h1", { className: "text-3xl font-bold mb-4", children: "TopTApp" }), _jsx("p", { className: "opacity-90", children: "Falta la variable VITE_WORLD_ID_APP_ID en el archivo .env" })] }));
    }
    return (_jsxs("div", { className: "flex flex-col items-center justify-center min-h-screen text-white bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600", children: [_jsx("h1", { className: "text-4xl font-extrabold mb-8 drop-shadow-lg", children: "\uD83D\uDD25 TopTApp \uD83D\uDD25" }), _jsx("p", { className: "mb-6 text-lg", children: "Inicia sesi\u00F3n con tu World ID para jugar" }), _jsx(IDKitWidget, { app_id: app_id, action: "toptapp_login", onSuccess: handleSuccess, children: ({ open }) => (_jsx("button", { onClick: open, className: "bg-gradient-to-r from-yellow-300 to-orange-500 text-black px-6 py-3 rounded-xl text-lg font-bold shadow-lg hover:scale-105 transition-transform", children: "\uD83C\uDF0D Iniciar con World ID" })) })] }));
};
export default Login;
