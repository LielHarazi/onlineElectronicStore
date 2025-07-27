import { Router } from "express";
import axios from "axios";

const router = Router();

const DISCORD_WEBHOOK_URL =
  "https://discordapp.com/api/webhooks/1398998066287345674/hxAwN2wLV3P4OkuYA-AwZoRUjIW9yYDVN5VlHN7Yp5o_Iy7h3dORAx3XoR-gSQtaCr6j";

router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    await axios.post(DISCORD_WEBHOOK_URL, {
      content: `📩 **New Contact Message**\n👤 Name: ${name}\n📧 Email: ${email}\n📝 Message: ${message}`,
    });

    res.status(200).json({ success: true, message: "Message sent to Discord" });
  } catch (error) {
    console.error("Error sending message to Discord:", error);
    res.status(500).json({ success: false, error: "Failed to send message" });
  }
});

export default router;
