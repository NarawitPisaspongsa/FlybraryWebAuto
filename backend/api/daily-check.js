import { runCheck } from "../libs/checkReturnDates.js";

export default async function handler(req, res) {
  try {
    await runCheck();
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Cron error:", err);
    return res.status(500).json({ error: "Cron failed" });
  }
}
