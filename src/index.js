import { WechatyBuilder } from "wechaty";
import { uploadWxData } from "./core/service.js";
import { extractKeyData } from "./core/extract-key-data.js";
import qrcodeTerminal from "qrcode-terminal";

let name = "loopy_bot";
let bot = "";
bot = WechatyBuilder.build({
  name, // generate xxxx.memory-card.json and save login data for the next login
  puppet: "wechaty-puppet-wechat4u",
});

bot
  .on("scan", (qrcode) => {
    qrcodeTerminal.generate(qrcode, { small: true });
  })
  .on("login", (user) => {
    console.log(`${user.name()} logged`);
  })
  .on("ready", async () => {
    extractKeyData(bot)
      .then(uploadWxData)
      .catch((error) => {
        console.error("Failed to extract key data:", error);
      });
  })
  .on("logout", () => {
    console.log("logout");
  })
  .on("room-join", async (room) => {
    room.say(
      `欢迎${nameList}🤪加入🎉${await room.topic()}🎉，一起来开启变强之旅🧑‍🦲\n\n哇呜！有问题看群公告嗷🧸`
    );
  })
  .on("error", (error) => {
    console.warn(error);
  })
  .on("message", async (message) => {})
  .start();
