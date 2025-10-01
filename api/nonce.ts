import type { VercelRequest, VercelResponse } from "@vercel/node";
import crypto from "crypto";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).end("Method Not Allowed");
  }

  const nonce = crypto.randomUUID().replace(/-/g, ""); // alfanumérico
  res.setHeader("Set-Cookie", [
    `siwe=${nonce}`,
    "Path=/",
    "HttpOnly",
    "Secure",
    "SameSite=Lax",
    "Max-Age=600",
  ].join("; "));
  res.status(200).json({ nonce });
}
