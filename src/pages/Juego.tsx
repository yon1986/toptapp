import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

type Jugador = {
  nombre: string;
  taps: number;
};

// ⚠️ Cambiar a 86400 (24h reales) cuando ya no sea prueba
const DURACION_PRUEBA = 86400; // 24h en segundos

const Juego = () => {
  const [taps, setTaps] = useState<number>(0);
  const [globalTaps, setGlobalTaps] = useState<number>(1234567);
  const [jugadoresActivos, setJugadoresActivos] = useState<number>(87);

  const [activo, setActivo] = useState<boolean>(false);
  const [tiempo, setTiempo] = useState<number>(0);
  const [mensaje, setMensaje] = useState<string>("👉 Activa tu sesión para empezar");
  const [tapEffect, setTapEffect] = useState<boolean>(false);

  const [rankingDiario, setRankingDiario] = useState<Jugador[]>([
    { nombre: "Carlos", taps: 230 },
    { nombre: "María", taps: 180 },
    { nombre: "Pedro", taps: 95 },
    { nombre: "Ana", taps: 60 },
    { nombre: "Sofía", taps: 40 },
  ]);
  const [posicion, setPosicion] = useState<number | null>(null);

  // Revisar si ya hay sesión guardada
  useEffect(() => {
    const finGuardado = localStorage.getItem("finSesion");
    const tapsGuardados = localStorage.getItem("tapsSesion");

    if (finGuardado) {
      const tiempoRestante = Math.floor((parseInt(finGuardado) - Date.now()) / 1000);
      if (tiempoRestante > 0) {
        setActivo(true);
        setTiempo(tiempoRestante);
        setMensaje("👉 ¡Empieza a tapear!");
        setTaps(tapsGuardados ? parseInt(tapsGuardados) : 0);
      } else {
        localStorage.removeItem("finSesion");
        localStorage.removeItem("tapsSesion");
      }
    }
  }, []);

  // Temporizador persistente
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (activo && tiempo > 0) {
      timer = setInterval(() => {
        setTiempo((t: number) => {
          if (t <= 1) {
            setActivo(false);
            setMensaje("⏳ ¡Tu sesión terminó!");
            localStorage.removeItem("finSesion");
            localStorage.removeItem("tapsSesion");
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [activo, tiempo]);

  // Activar sesión (revisar login)
  const activarSesion = () => {
    const user = localStorage.getItem("worldID");
    if (!user) {
      alert("⚠️ Debes iniciar sesión con World ID para jugar.");
      return;
    }

    const fin = Date.now() + DURACION_PRUEBA * 1000;
    localStorage.setItem("finSesion", fin.toString());
    localStorage.setItem("tapsSesion", "0");
    setActivo(true);
    setTiempo(DURACION_PRUEBA);
    setTaps(0);
    setMensaje("👉 ¡Empieza a tapear!");
  };

  // Manejo de TAP
  const handleTap = () => {
    if (!activo) return;

    const nuevoTap = taps + 1;
    setTaps(nuevoTap);
    localStorage.setItem("tapsSesion", nuevoTap.toString());
    setGlobalTaps((prev: number) => prev + 1);

    if (nuevoTap < 10) setMensaje("🔥 ¡Buen comienzo!");
    else if (nuevoTap < 50) setMensaje("🚀 ¡Vas con ritmo!");
    else if (nuevoTap < 100) setMensaje("💪 ¡Imparable!");
    else setMensaje("👑 ¡Eres una máquina de taps!");

    setRankingDiario((prev: Jugador[]) => {
      const copia = [...prev];
      const index = copia.findIndex((j: Jugador) => j.nombre === "Tú");

      if (index >= 0) {
        copia[index].taps = nuevoTap;
      } else {
        copia.push({ nombre: "Tú", taps: nuevoTap });
      }

      return copia.sort((a: Jugador, b: Jugador) => b.taps - a.taps).slice(0, 10);
    });

    setTapEffect(true);
    setTimeout(() => setTapEffect(false), 500);
  };

  // Actualizar posición en ranking
  useEffect(() => {
    const index = rankingDiario.findIndex((j: Jugador) => j.nombre === "Tú");
    if (index >= 0) setPosicion(index + 1);
  }, [rankingDiario]);

  // Simulación de jugadores activos
  useEffect(() => {
    const intervalo = setInterval(() => {
      setJugadoresActivos((prev: number) => {
        let cambio = Math.floor(Math.random() * 5) - 2;
        let nuevo = prev + cambio;
        if (nuevo < 1) nuevo = 1;
        return nuevo;
      });
    }, 3000);
    return () => clearInterval(intervalo);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-start h-screen text-white px-6 pt-12 pb-16 overflow-y-auto bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 animate-gradient-x">
      <h1 className="text-4xl font-extrabold mb-8 drop-shadow-lg">🔥 TopTApp 🔥</h1>

      {/* Jugadores activos */}
      <div className="absolute top-6 right-6 bg-black bg-opacity-40 px-3 py-1 rounded-lg text-sm shadow-md">
        👥 {jugadoresActivos} activos
      </div>

      {/* Contador global */}
      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black rounded-2xl p-4 shadow-2xl mb-6 w-72 text-center border-4 border-yellow-200">
        <p className="text-base font-semibold">🌍 Taps globales:</p>
        <p className="text-2xl font-extrabold">{globalTaps.toLocaleString()}</p>
      </div>

      {posicion && (
        <p className="text-base font-bold mb-4">
          📊 Estás en el puesto <span className="text-yellow-300">#{posicion}</span> de hoy
        </p>
      )}

      <p className="text-2xl mb-2 font-bold drop-shadow-md">Tus taps: {taps}</p>
      <p className="bg-gradient-to-r from-pink-400 to-yellow-300 text-transparent bg-clip-text text-xl font-extrabold italic mb-4 animate-pulse">
        {mensaje}
      </p>

      {/* Tiempo restante */}
      {activo && (
        <p className="mb-4 bg-black bg-opacity-40 px-4 py-2 rounded-lg text-base">
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
          className={`bg-gradient-to-r from-yellow-300 to-orange-500 text-black text-3xl font-bold rounded-full w-48 h-48 shadow-2xl border-4 border-yellow-200 transition-transform duration-150 
            ${activo ? "active:scale-90 active:shadow-inner hover:scale-105" : "opacity-50 cursor-not-allowed"}`}
          disabled={!activo}
        >
          TAP
        </button>

        {tapEffect && (
          <span className="absolute top-10 left-1/2 transform -translate-x-1/2 text-2xl font-bold text-pink-300 animate-fade-up">
            +1
          </span>
        )}
      </div>

      {!activo && (
        <button
          onClick={activarSesion}
          className="mt-6 bg-gradient-to-r from-green-400 to-green-600 text-black px-5 py-2 rounded-full text-lg font-bold shadow-lg hover:scale-105 transition-transform"
        >
          ✅ Activar 24h ilimitado
        </button>
      )}

      {/* Botón Ranking */}
      <Link
        to="/ranking"
        className="mt-8 bg-gradient-to-r from-pink-400 via-purple-600 to-indigo-500 text-white px-8 py-3 rounded-full text-xl font-extrabold shadow-2xl border-4 border-pink-200 hover:scale-105 transition-transform"
      >
        🏆 Ver ranking
      </Link>
    </div>
  );
};

export default Juego;
