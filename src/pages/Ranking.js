import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
const rankingHistorico = [
    { nombre: "Carlos", taps: 25430 },
    { nombre: "María", taps: 19200 },
    { nombre: "Pedro", taps: 15000 },
    { nombre: "Ana", taps: 12000 },
    { nombre: "Sofía", taps: 9800 },
];
const ranking24h = [
    { nombre: "Tú", taps: 230 },
    { nombre: "María", taps: 180 },
    { nombre: "Pedro", taps: 140 },
    { nombre: "Ana", taps: 95 },
    { nombre: "Sofía", taps: 60 },
];
const Ranking = () => {
    return (_jsxs("div", { className: "flex flex-col items-center justify-start h-screen text-white px-6 pt-12 pb-16 overflow-y-auto bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 animate-gradient-x", children: [_jsx("h1", { className: "text-4xl font-extrabold mb-10 drop-shadow-lg text-center", children: "\uD83C\uDFC6 Ranking" }), _jsxs("div", { className: "bg-gradient-to-r from-yellow-400 to-orange-500 text-black rounded-2xl p-4 shadow-xl mb-8 w-80 text-center border-4 border-yellow-200", children: [_jsx("h2", { className: "text-xl font-bold mb-2", children: "\uD83D\uDC51 Jugador hist\u00F3rico" }), _jsxs("p", { className: "text-lg font-extrabold", children: [rankingHistorico[0].nombre, " \u2014", " ", rankingHistorico[0].taps.toLocaleString(), " taps"] })] }), _jsxs("div", { className: "bg-black bg-opacity-40 rounded-xl p-4 w-80 shadow-lg mb-10", children: [_jsx("h2", { className: "text-xl font-bold mb-4 text-center", children: "\uD83D\uDCC5 Top 24 horas" }), ranking24h.map((jugador, i) => (_jsxs("p", { className: `text-base font-semibold mb-1 ${jugador.nombre === "Tú" ? "text-yellow-300" : ""}`, children: [i + 1, ". ", jugador.nombre, " \u2014 ", jugador.taps, " taps"] }, i)))] }), _jsx(Link, { to: "/", className: "mt-4 bg-gradient-to-r from-yellow-300 to-orange-500 text-black px-5 py-2 rounded-full text-lg font-bold shadow-lg hover:scale-105 transition-transform", children: "\u2B05 Volver al inicio" })] }));
};
export default Ranking;
