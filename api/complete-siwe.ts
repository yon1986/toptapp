import type { VercelRequest, VercelResponse } from "@vercel/node";
import {
  verifySiweMessage,
  type MiniAppWalletAuthSuccessPayload,
} from "@worldcoin/minikit-js";

function readCookie(req: VercelRequest, key: string) {
  const c = req.headers.cookie || "";
  const map = Object.fromEntries(
    c.split(";").map(s => s.trim()).filter(Boolean).map(s => {
      const i = s.indexOf("="); return [s.slice(0, i), s.slice(i + 1)];
    })
  );
  return map[key];
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end("Method Not Allowed");
  }
  try {
    const { payload, nonce } = req.body as {
      payload: MiniAppWalletAuthSuccessPayload;
      nonce: string;
    };

    const serverNonce = readCookie(req, "siwe");
    if (!serverNonce || serverNonce !== nonce) {
      return res.status(400).json({ ok: false, error: "INVALID_NONCE" });
    }

    const result = await verifySiweMessage(payload, nonce);
    if (!result.isValid) {
      return res.status(401).json({ ok: false, error: "INVALID_SIGNATURE" });
    }

    return res.status(200).json({ ok: true, address: payload.address });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ ok: false, error: err?.message || "ERROR" });
  }
}
