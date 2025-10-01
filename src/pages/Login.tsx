import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MiniKit } from "@worldcoin/minikit-js";

const APP_ID = import.meta.env.VITE_WORLD_APP_ID as string;

const Login = () => {
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const openInWorldApp = () => {
    // Deep link para abrir dentro de World App
    const path = encodeURIComponent("/login");
    const url = `worldapp://mini-app?app_id=${APP_ID}&path=${path}`;
    window.location.href = url;
  };

  const signIn = useCallback(async () => {
    setMsg(null);
    setLoading(true);
    try {
      if (!MiniKit.isInstalled()) {
        setMsg("⚠️ Abre esta miniapp dentro de World App.");
        setLoading(false);
        return;
      }

      // 1) Pide nonce a tu backend
      const nonceRes = await fetch("/api/nonce");
      if (!nonceRes.ok) throw new Error("No se pudo generar nonce");
      const { nonce } = await nonceRes.json();

      // 2) Wallet Authentication
      const { finalPayload } = await MiniKit.commandsAsync.walletAuth({
        nonce,
        statement: "Inicia sesión en TopTApp para jugar y registrar tu progreso.",
        expirationTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        notBefore: new Date(Date.now() - 24 * 60 * 60 * 1000),
      });

      if (finalPayload.status === "error") {
        throw new Error("Firma cancelada o inválida.");
      }

      // 3) Verifica en backend
      const verifyRes = await fetch("/api/complete-siwe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ payload: finalPayload, nonce }),
      });
      const verifyJson = await verifyRes.json();

      if (!verifyRes.ok || !verifyJson?.ok || !verifyJson?.address) {
        throw new Error("Verificación SIWE fallida.");
      }

      // 4) Guardar en localStorage
      localStorage.setItem("worldID", JSON.stringify(verifyJson));
      localStorage.setItem("playerName", verifyJson.address);

      // Ir al juego
      nav("/", { replace: true });
    } catch (e: any) {
      console.error(e);
      setMsg(e?.message ?? "Error iniciando sesión.");
    } finally {
      setLoading(false);
    }
  }, [nav]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600">
      <h1 className="text-4xl font-extrabold mb-8 drop-shadow-lg">🔥 TopTApp 🔥</h1>
      <p className="mb-6 text-lg">Inicia sesión con tu World App para jugar</p>

      <button
        disabled={loading}
        onClick={signIn}
        className="bg-gradient-to-r from-yellow-300 to-orange-500 text-black px-6 py-3 rounded-xl text-lg font-bold shadow-lg hover:scale-105 transition-transform"
      >
        {loading ? "Firmando en World App..." : "🌍 Iniciar con World App"}
      </button>

      {!MiniKit.isInstalled() && (
        <button
          onClick={openInWorldApp}
          className="mt-4 underline opacity-80"
        >
          Abrir en World App
        </button>
      )}

      {msg && <p className="mt-4 text-red-400">{msg}</p>}
    </div>
  );
};

export default Login;
