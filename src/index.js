import { WechatyBuilder } from "wechaty";
import { uploadWxData } from "./core/service.js";
import { extractKeyData } from "./core/extract-key-data.js";
import qrcodeTerminal from "qrcode-terminal";
import { initTask } from "./core/schedule-task.js";
import { handleMessage } from "./core/handle-message.js";

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
  .on("ready", async (e) => {
    // extractKeyData(bot)
    //   .then((res) => {
    //     uploadWxData({
    //       friends: res.friends.map((i) => {
    //         return {
    //           name: i.name,
    //           alias: i.alias,
    //         };
    //       }),
    //       rooms: res.rooms.map((i) => {
    //         return {
    //           name: i.name,
    //           memberCount: i.memberCount,
    //         };
    //       }),
    //     });
    //     initTask(bot, res.friends, res.rooms);
    //   })
    //   .catch((error) => {
    //     console.error("Failed to extract key data:", error);
    //   });
  })
  .on("logout", () => {
    console.log("logout");
  })
  .on("room-join", async (room, inviteeList, inviter) => {
    const nameList = inviteeList.map((c) => c.name()).join(",");
    const name = await room.topic();
    console.log(inviteeList);
    console.log(nameList, name);
    room.say(`欢迎${nameList}🤪加入🎉${name}🎉，一起来开启变强之旅🧑‍🦲\n\n哇呜！有问题看群公告嗷🧸`);
  })
  .on("error", (error) => {
    console.warn(error);
  })
  .on("message", (msg) => handleMessage(bot, msg))
  .start();
