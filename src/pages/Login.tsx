import { IDKitWidget, ISuccessResult } from "@worldcoin/idkit";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const app_id = import.meta.env.VITE_WORLD_ID_APP_ID || "tu_app_id";

const Login = () => {
  const navigate = useNavigate();

  const handleSuccess = (result: ISuccessResult) => {
    console.log("✅ Login exitoso con World ID:", result);
    localStorage.setItem("playerName", result.nullifier_hash);
    localStorage.setItem("worldID", JSON.stringify(result));
    navigate("/");
  };

  // ⚡ Abre el widget automáticamente al entrar a Login
  useEffect(() => {
    const btn = document.getElementById("world-id-hidden-btn");
    if (btn) btn.click();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600">
      <h1 className="text-4xl font-extrabold mb-8 drop-shadow-lg">🔥 TopTApp 🔥</h1>
      <p className="mb-6 text-lg">Validando identidad con World ID...</p>

      <IDKitWidget
        app_id={app_id}
        action="toptapp_login"
        onSuccess={handleSuccess}
      >
        {({ open }) => (
          <button id="world-id-hidden-btn" onClick={open} style={{ display: "none" }}>
            hidden
          </button>
        )}
      </IDKitWidget>
    </div>
  );
};

export default Login;
