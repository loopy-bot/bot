import "../_alias/index.cjs";
import { WechatyBuilder } from "wechaty";
import { startScheduledTasks } from "./modules/scheduled-tasks/index.js";
import { sendMail, sendQrcode } from "./utils/email.js";
import { createProcessMessage } from "./modules/process-message/index.js";

let name = "loopy_bot";
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
        // startScheduledTasks(bot);
    })
    .on("logout", () => {
        sendMail("logout", `您的账户已经登出账户！`);
    })
    .on("room-join", async (room, inviteeList, inviter) => {
        const nameList = inviteeList.map((i) => `@${i.name()}`).join(",");
        room.say(
            `欢迎${nameList}🤪加入🎉${await room.topic()}🎉，一起来开启变强之旅🧑‍🦲\n\n哇呜！有问题看群公告嗷🧸`
        );
    })
    .on("error", (error) => {
        sendMail("error", JSON.stringify(error));
    })
    .on("message", async (message) => {
        if (await message.mentionSelf()) {
            handleMessage(bot, message);
        }
    })
    .start();
