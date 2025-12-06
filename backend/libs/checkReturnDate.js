import Transaction from "../models/Transaction.js";
import { sendLineNotification } from "../libs/line.js";

export async function runCheck() {
  const now = new Date();
  const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);

  const dueSoon = await Transaction.find({
    returnDate: {
      $lte: tomorrow
    },
    notified: false
  });

  for (const t of dueSoon) {
    await sendLineNotification(t.userId, "Your return date is coming up!");
    t.notified = true;
    await t.save();
  }
}
