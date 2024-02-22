import { WechatyBuilder } from "wechaty";
import { startScheduledTasks } from "./modules/scheduledTasks/index.js";
import { sendMail } from "./utils/email.js";
import { chat } from "./modules/AI/qwen.js";

const name = "wechat-assistant-pro";
const reply = await chat();
let bot = "";

bot = WechatyBuilder.build({
  name, // generate xxxx.memory-card.json and save login data for the next login
  puppet: "wechaty-puppet-wechat4u",
});
bot
  .on("scan", (qrcode, status) => {
    console.log(
      `Scan QR Code to login: ${status}\n\n\nhttps://wechaty.js.org/qrcode/${encodeURIComponent(
        qrcode
      )}`
    );
  })
  .on("login", (user) => {
    console.log(`User ${user} logged in`);
  })
  .on("ready", async () => {
    startScheduledTasks(bot);
  })
  .on("logout", (user) => {
    console.log(user);
    sendMail("logout", `您的账户已经登出账户！`);
  })
  .on("error", (error) => {
    console.log(error);
  })
  .on("message", async (message) => {
    if (
      message.type() === bot.Message.Type.Text &&
      (await message.mentionSelf())
    ) {
      const contact = message.talker();
      const text = message
        .text()
        .replace(/@\S+\s/g, "")
        .trim(); // 去除at部分
      console.log(`来自${contact.name()}的提问，内容为：${text}`);
      const data = await reply(text);
      console.log(`回答内容为：${data}`);
      message.say(`@${contact.name()} ${data}`);
    }
  })
  .start();
