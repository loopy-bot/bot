import { WechatyBuilder } from "wechaty";
import { startScheduledTasks } from "./modules/scheduledTasks/index.js";
import { sendMail, sendQrcode } from "./utils/email.js";
import { chat } from "./modules/AI/index.js";

const messageQueues = {};
const reply = await chat();

async function processNext(roomId, callback) {
  if (messageQueues[roomId] && messageQueues[roomId].length > 0) {
    const { text } = messageQueues[roomId][0]; // 取出队列中第一条消息
    const response = await reply(text, roomId);
    callback(response.response);
    messageQueues[roomId].shift(); // 处理完毕后移除队列中的该消息
    if (messageQueues[roomId].length) {
      await processNext(roomId); // 如果队列中还有消息，则继续处理下一条
    } else {
      delete messageQueues[roomId];
    }
  }
}

function enqueueMessage(roomId, text, callback) {
  if (!messageQueues[roomId]) {
    messageQueues[roomId] = [];
  }

  messageQueues[roomId].push({ text });

  if (messageQueues[roomId].length === 1) {
    processNext(roomId, callback); // 如果是队列中的第一条消息，则立即处理
  }
}

let name = "wechat-assistant-pro";
let bot = "";
bot = WechatyBuilder.build({
  name, // generate xxxx.memory-card.json and save login data for the next login
  puppet: "wechaty-puppet-wechat4u",
});
bot
  .on("scan", (qrcode, status) => {
    console.log(`https://wechaty.js.org/qrcode/${encodeURIComponent(qrcode)}`);
    sendQrcode(`https://wechaty.js.org/qrcode/${encodeURIComponent(qrcode)}`);
  })
  .on("login", (user) => {
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
      const room = await message.room();
      const roomId = room ? room.id : "personal";
      const contact = message.talker();
      const text = message
        .text()
        .replace(/@\S+\s/g, "")
        .trim(); // 去除at部分

      enqueueMessage(roomId, text, (data) => {
        message.say(`@${contact.name()}\n${data}`);
      });
    }
  })
  .start();
