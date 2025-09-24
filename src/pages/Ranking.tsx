import { Link } from "react-router-dom";

type Jugador = {
  nombre: string;
  taps: number;
};

const rankingHistorico: Jugador[] = [
  { nombre: "Carlos", taps: 25430 },
  { nombre: "María", taps: 19200 },
  { nombre: "Pedro", taps: 15000 },
  { nombre: "Ana", taps: 12000 },
  { nombre: "Sofía", taps: 9800 },
];

const ranking24h: Jugador[] = [
  { nombre: "Tú", taps: 230 },
  { nombre: "María", taps: 180 },
  { nombre: "Pedro", taps: 140 },
  { nombre: "Ana", taps: 95 },
  { nombre: "Sofía", taps: 60 },
];

const Ranking = () => {
  return (
    <div className="flex flex-col items-center justify-start h-screen text-white px-6 pt-12 pb-16 overflow-y-auto bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 animate-gradient-x">
      <h1 className="text-4xl font-extrabold mb-10 drop-shadow-lg text-center">
        🏆 Ranking
      </h1>

      {/* Jugador histórico */}
      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black rounded-2xl p-4 shadow-xl mb-8 w-80 text-center border-4 border-yellow-200">
        <h2 className="text-xl font-bold mb-2">👑 Jugador histórico</h2>
        <p className="text-lg font-extrabold">
          {rankingHistorico[0].nombre} —{" "}
          {rankingHistorico[0].taps.toLocaleString()} taps
        </p>
      </div>

      {/* Top 24 horas */}
      <div className="bg-black bg-opacity-40 rounded-xl p-4 w-80 shadow-lg mb-10">
        <h2 className="text-xl font-bold mb-4 text-center">📅 Top 24 horas</h2>
        {ranking24h.map((jugador, i) => (
          <p
            key={i}
            className={`text-base font-semibold mb-1 ${
              jugador.nombre === "Tú" ? "text-yellow-300" : ""
            }`}
          >
            {i + 1}. {jugador.nombre} — {jugador.taps} taps
          </p>
        ))}
      </div>

      <Link
        to="/"
        className="mt-4 bg-gradient-to-r from-yellow-300 to-orange-500 text-black px-5 py-2 rounded-full text-lg font-bold shadow-lg hover:scale-105 transition-transform"
      >
        ⬅ Volver al inicio
      </Link>
    </div>
  );
};

export default Ranking;
