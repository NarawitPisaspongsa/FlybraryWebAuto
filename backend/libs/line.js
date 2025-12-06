import axios from "axios";

const LINE_MESSAGING_API = "https://api.line.me/v2/bot/message/push";
const CHANNEL_ACCESS_TOKEN = process.env.LINE_CHANNEL_ACCESS_TOKEN;

// userId = LINE UID of the user you want to notify
export async function sendLineNotification(userId, message) {
  if (!CHANNEL_ACCESS_TOKEN) {
    console.error("❌ Missing LINE_CHANNEL_ACCESS_TOKEN environment variable.");
    return;
  }

  try {
    await axios.post(
      LINE_MESSAGING_API,
      {
        to: userId,
        messages: [
          {
            type: "text",
            text: message,
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${CHANNEL_ACCESS_TOKEN}`
        },
      }
    );

    console.log("Sent LINE notification to", userId);

  } catch (error) {
    console.error("Error sending LINE message:", error.response?.data || error);
  }
}
