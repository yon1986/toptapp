import { IDKitWidget, ISuccessResult } from "@worldcoin/idkit";
import { useNavigate } from "react-router-dom";

const app_id = import.meta.env.VITE_WORLD_ID_APP_ID as string;

// 👇 LOG TEMPORAL para verificar en consola si Vercel está cargando la variable
console.log("APP ID en frontend:", app_id);

const Login = () => {
  const navigate = useNavigate();

  const handleSuccess = (result: ISuccessResult) => {
    console.log("✅ Login exitoso con World ID:", result);

    // Guardar identidad mínima
    localStorage.setItem("playerName", result.nullifier_hash);
    localStorage.setItem("worldID", JSON.stringify(result));

    // Ir al juego
    navigate("/");
  };

  if (!app_id) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-white bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600">
        <h1 className="text-3xl font-bold mb-4">TopTApp</h1>
        <p className="opacity-90">
          ⚠️ Falta la variable VITE_WORLD_ID_APP_ID en el archivo .env o en Vercel
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600">
      <h1 className="text-4xl font-extrabold mb-8 drop-shadow-lg">🔥 TopTApp 🔥</h1>
      <p className="mb-6 text-lg">Inicia sesión con tu World ID para jugar</p>

      <IDKitWidget
        app_id={app_id}
        action="toptapp_login"
        onSuccess={handleSuccess}
      >
        {({ open }: { open: () => void }) => (
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
