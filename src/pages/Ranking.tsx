return (
  <div className="flex flex-col items-center justify-start h-screen text-white px-6 pt-8 pb-8 overflow-y-auto bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 animate-gradient-x">
    <h1 className="text-5xl font-extrabold mb-10 drop-shadow-lg text-center">
      🏆 Ranking
    </h1>

    {/* Jugador histórico */}
    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black rounded-2xl p-6 shadow-xl mb-10 w-96 text-center border-4 border-yellow-200">
      <h2 className="text-2xl font-bold mb-2">👑 Jugador histórico</h2>
      <p className="text-xl font-extrabold">
        {rankingHistorico[0].nombre} —{" "}
        {rankingHistorico[0].taps.toLocaleString()} taps
      </p>
    </div>

    {/* Top 24 horas */}
    <div className="bg-black bg-opacity-40 rounded-xl p-6 w-96 shadow-lg mb-10">
      <h2 className="text-2xl font-bold mb-4 text-center">📅 Top 24 horas</h2>
      {ranking24h.map((jugador, i) => (
        <p
          key={i}
          className={`text-lg font-semibold mb-1 ${
            jugador.nombre === "Tú" ? "text-yellow-300" : ""
          }`}
        >
          {i + 1}. {jugador.nombre} — {jugador.taps} taps
        </p>
      ))}
    </div>

    <Link
      to="/"
      className="mt-4 bg-gradient-to-r from-yellow-300 to-orange-500 text-black px-6 py-3 rounded-full text-lg font-bold shadow-lg hover:scale-105 transition-transform"
    >
      ⬅ Volver al inicio
    </Link>
  </div>
);
