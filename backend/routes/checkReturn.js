const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");
const axios = require("axios");

async function sendLineMessage(userId, message) {
  try {
    await axios.post(
      "https://api.line.me/v2/bot/message/push",
      {
        to: userId,
        messages: [{ type: "text", text: message }]
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.LINE_CHANNEL_ACCESS_TOKEN}`,
        }
      }
    );
  } catch (err) {
    console.error("LINE push error:", err.response?.data || err.message);
  }
}

router.get("/", async (req, res) => {
  try {
    const now = new Date();
    const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    const dueSoon = await Transaction.find({
      returnDate: { $gte: now, $lte: tomorrow },
    }).populate("user").populate("book");

    for (const t of dueSoon) {
      const message = `Reminder!\nYour book "${t.book?.name || "UNKNOWN"}" is due soon. Please return it before: ${t.returnDate.toLocaleString()}`;

      await sendLineMessage(t.user?.lineId, message);
      await t.save();
    }

    res.json({ status: "ok" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Check return failed" });
  }
});

module.exports = router;
