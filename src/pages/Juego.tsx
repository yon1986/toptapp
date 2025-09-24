return (
  <div className="relative flex flex-col items-center justify-start h-screen text-white px-6 pt-8 pb-8 overflow-y-auto bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 animate-gradient-x">
    <h1 className="text-5xl font-extrabold mb-6 drop-shadow-lg">🔥 TopTApp 🔥</h1>

    {/* Jugadores activos */}
    <div className="absolute top-4 right-4 bg-black bg-opacity-40 px-3 py-1 rounded-lg text-sm shadow-md">
      👥 {jugadoresActivos} activos
    </div>

    {/* Contador global */}
    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black rounded-2xl p-6 shadow-2xl mb-6 w-80 text-center border-4 border-yellow-200">
      <p className="text-lg font-semibold">🌍 Taps globales:</p>
      <p className="text-3xl font-extrabold">{globalTaps.toLocaleString()}</p>
    </div>

    {posicion && (
      <p className="text-lg font-bold mb-4">
        📊 Estás en el puesto <span className="text-yellow-300">#{posicion}</span> de hoy
      </p>
    )}

    <p className="text-3xl mb-2 font-bold drop-shadow-md">Tus taps: {taps}</p>
    <p className="bg-gradient-to-r from-pink-400 to-yellow-300 text-transparent bg-clip-text text-2xl font-extrabold italic mb-4 animate-pulse">
      {mensaje}
    </p>

    {/* Tiempo restante */}
    {activo && (
      <p className="mb-4 bg-black bg-opacity-40 px-4 py-2 rounded-lg text-lg">
        ⏳ Tiempo restante:{" "}
        <span className="font-bold text-yellow-300">
          {Math.floor(tiempo / 60)}m {tiempo % 60}s
        </span>
      </p>
    )}

    {/* Botón TAP */}
    <div className="relative">
      <button
        onClick={handleTap}
        className={`bg-gradient-to-r from-yellow-300 to-orange-500 text-black text-4xl font-bold rounded-full w-64 h-64 shadow-2xl border-4 border-yellow-200 transition-transform duration-150 
          ${activo ? "active:scale-90 active:shadow-inner hover:scale-110" : "opacity-50 cursor-not-allowed"}`}
        disabled={!activo}
      >
        TAP
      </button>

      {tapEffect && (
        <span className="absolute top-12 left-1/2 transform -translate-x-1/2 text-4xl font-bold text-pink-300 animate-fade-up">
          +1
        </span>
      )}
    </div>

    {!activo && (
      <button
        onClick={activarSesion}
        className="mt-6 bg-gradient-to-r from-green-400 to-green-600 text-black px-6 py-3 rounded-full text-xl font-bold shadow-lg hover:scale-105 transition-transform"
      >
        ✅ Activar 30s ilimitado (Prueba)
      </button>
    )}

    {/* Botón Ranking */}
    <Link
      to="/ranking"
      className="mt-8 bg-gradient-to-r from-pink-400 via-purple-600 to-indigo-500 text-white px-10 py-4 rounded-full text-2xl font-extrabold shadow-2xl border-4 border-pink-200 hover:scale-110 transition-transform"
    >
      🏆 Ver ranking
    </Link>
  </div>
);
