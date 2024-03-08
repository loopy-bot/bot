import { WechatyBuilder } from "wechaty";
import { startScheduledTasks } from "./modules/scheduledTasks/index.js";
import { sendMail, sendQrcode } from "./utils/email.js";
import { createProcessMessage } from "./modules/processMessage/index.js";

let name = "wechat-assistant-pro";
let bot = "";
let handleMessage;
bot = WechatyBuilder.build({
    name, // generate xxxx.memory-card.json and save login data for the next login
    puppet: "wechaty-puppet-wechat4u",
});

bot.on("scan", (qrcode, status) => {
    console.log(`https://wechaty.js.org/qrcode/${encodeURIComponent(qrcode)}`);
})
    .on("login", (user) => {
        handleMessage = createProcessMessage(bot);
        console.log(`User ${user} logged in`);
    })
    .on("ready", async () => {
        startScheduledTasks(bot);
    })
    .on("logout", () => {
        sendMail("logout", `您的账户已经登出账户！`);
    })
    .on("error", (error) => {
        console.log(error);
    })
    .on("message", async (message) => {
        if (await message.mentionSelf()) {
            handleMessage(bot, message);
        }
    })
    .start();
