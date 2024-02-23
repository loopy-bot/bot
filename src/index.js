import { WechatyBuilder } from "wechaty";
import { startScheduledTasks } from "./modules/scheduledTasks/index.js";
import { sendMail } from "./utils/email.js";
import { chat } from "./modules/AI/qwen.js";

const name = "wechat-assistant-pro";
const reply = await chat();
let bot = "";

// 每个群聊的消息队列映射
const messageQueues = new Map();

// 处理队列中的下一条消息
async function processNext(roomId) {
  if (!messageQueues.has(roomId) || messageQueues.get(roomId).length === 0) {
    return;
  }

  const queue = messageQueues.get(roomId);
  const { message, contact } = queue[0];

  let res = await reply(message.text(), roomId);
  while (res === "Error occurred") {
    console.log("AI error, retrying...");
    res = await reply(message.text(), roomId);
  }
  queue.shift();
  console.log(`回答内容为：${res}`);

  if (message.room()) {
    await message.say(`@${contact.name()} ${res}`);
  } else {
    await message.say(res);
  }

  // 如果队列中还有消息，继续处理下一条
  if (queue.length > 0) {
    processNext(roomId);
  }
}

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
    if (await message.mentionSelf()) {
      const room = await message.room(); // 获取群聊信息
      const roomId = room ? room.id : "personal";
      const contact = message.talker();

      if (!messageQueues.has(roomId)) {
        messageQueues.set(roomId, []);
      }

      // 将消息添加到对应群聊的队列中
      messageQueues.get(roomId).push({ message, contact });

      // 如果队列长度为1，立即处理消息，否则，它将在前一条消息处理完毕后被处理
      if (messageQueues.get(roomId).length === 1) {
        processNext(roomId);
      }
    }
  })
  .start();
