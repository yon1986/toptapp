import { IDKitWidget, ISuccessResult } from "@worldcoin/idkit";
import { useNavigate } from "react-router-dom";

const app_id = import.meta.env.VITE_WORLD_ID_APP_ID || "tu_app_id"; 
// ⚠️ cambia "tu_app_id" por el que obtienes en https://developer.worldcoin.org

const Login = () => {
  const navigate = useNavigate();

  const handleSuccess = (result: ISuccessResult) => {
    console.log("✅ Login exitoso con World ID:", result);

    // Guardamos datos mínimos del usuario (ej: nullifier_hash único)
    localStorage.setItem("worldID", JSON.stringify(result));

    // Redirigimos al juego
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600">
      <h1 className="text-4xl font-extrabold mb-8 drop-shadow-lg">🔥 TopTApp 🔥</h1>
      <p className="mb-6 text-lg">Inicia sesión con tu World ID para jugar</p>

      <IDKitWidget
        app_id={app_id}
        action="toptapp_login"
        onSuccess={handleSuccess}
        enableTelemetry
      >
        {({ open }) => (
          <button
            onClick={open}
            className="bg-gradient-to-r from-yellow-300 to-orange-500 text-black px-6 py-3 rounded-xl text-lg font-bold shadow-lg hover:scale-105 transition-transform"
          >
            🌍 Iniciar con World ID
          </button>
        )}
      </IDKitWidget>
    </div>
  );
};

export default Login;
