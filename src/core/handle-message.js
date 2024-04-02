import { chat, getFile } from "./service.js";
import { FileBox } from "file-box";

const map = {};
const pushQueueMsg = (key, text, callback) => {
  if (!map[key]) {
    map[key] = [text];
  } else {
    map[key].push(text);
  }

  const processMsg = (key) => {
    if (map[key]?.length && text?.length) {
      const question = map[key].shift();
      chat({ key, question })
        .then((res) => {
          console.log("reply:", res);
          callback(res);
          processMsg(key);
        })
        .catch((e) => {
          console.log(`${key}-${question}-${e}`);
        });
    }
  };
  processMsg(key);
};
export const handleMessage = async (bot, msg) => {
  const contact = msg.talker();
  const text = msg
    .text()
    .replace(/@\S+\s/g, "")
    .trim(); // 去除at部分;
  const room = msg.room();

  const replyMessage = async (res) => {
    try {
      if (res.type === "text") {
        if (room) {
          msg.say(`@${contact.name()}\n${res.text}`);
        } else {
          msg.say(res.text);
        }
      }
      if (res.type === "file") {
        const file = await getFile(res.fileData.url);
        const fileBox = FileBox.fromBuffer(file, res.fileData.name);
        msg.say(fileBox);
      }
    } catch (error) {
      console.error(`回复消息时发生错误: ${error}`);
    }
  };
  if (room) {
    const topic = await room.topic();
    if (await msg.mentionSelf()) {
      pushQueueMsg(`${topic}_${contact.name()}`, text, replyMessage);
    }
  } else {
    pushQueueMsg(`person_${contact.name()}`, text, replyMessage);
  }
};
