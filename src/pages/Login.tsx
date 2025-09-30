import { init, ISuccessResult } from "@worldcoin/idkit-core";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const app_id = import.meta.env.VITE_WORLD_ID_APP_ID || "tu_app_id";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const startLogin = async () => {
      try {
        const idkit = init({
          app_id,
          action: "toptapp_login",
          onSuccess: (result: ISuccessResult) => {
            console.log("✅ Login exitoso:", result);

            // Guardamos identificador único
            localStorage.setItem("playerName", result.nullifier_hash);
            localStorage.setItem("worldID", JSON.stringify(result));

            // Redirigir al juego
            navigate("/");
          },
        });

        // ⚡ Abrir el flujo de validación directo
        await idkit.open();
      } catch (err) {
        console.error("❌ Error en login:", err);
      }
    };

    startLogin();
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600">
      <h1 className="text-4xl font-extrabold mb-8 drop-shadow-lg">🔥 TopTApp 🔥</h1>
      <p className="mb-6 text-lg">Validando identidad con World ID...</p>
    </div>
  );
};

export default Login;
