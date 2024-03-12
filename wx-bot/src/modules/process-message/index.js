import { createChat, reply, createAudioReply, createDraw, createRole } from '../AI/qwen.js';
import { FileBox } from 'file-box';
import * as T from '../../services/tianapi/index.js';

const { assembleMessage } = createChat();
const replyAudio = createAudioReply();
const replyImage = createDraw();
const matchQuestion = {
  getPoint: async () => {
    const res = await reply(
      '你是一个智能机器人，基于阿里模型，固定词语匹配有星座，天气，也就是说，当问题里包含这些字的时候，会触发这些接口的调用，从而输出实时的信息，除了这些，你还会简单的回复',
      '基于以上进行自我介绍',
    );
    return res;
  },
  getWeather: async (text) => {
    const weather = await reply('提取出该文本所说的城市，只需要城市，如果有多个城市，请用&分割', text);
    const res = await Promise.all(weather.split('&').map((i) => T.getWeather(i)));
    return reply(`下面是一些天气信息，用户问题进行总结回答，问题为${text}，信息如下：`, JSON.stringify(res));
  },
  getHoroscope: async (text) => {
    const hor = await reply(
      '提取出该文本所说的星座，只需要星座，如果有多个星座，请用&分割，如果少了座这个字的话，需要补充完整为某某座,内容如下：',
      text,
    );
    console.log(hor);
    const res = await Promise.all(hor.split('&').map((i) => T.getHoroscope(i)));
    return reply(`下面是一些星座信息，用户问题进行总结回答，问题为${text}，信息如下：`, JSON.stringify(res));
  },
};

export const createProcessMessage = (bot) => {
  // 定义策略对象
  const messageStrategies = {
    [bot.Message.Type.Text]: async (bot, message) => {
      // 处理文本消息
      const room = await message.room();
      const roomId = room ? room.id : 'personal';
      const contact = message.talker();
      const text = message
        .text()
        .replace(/@\S+\s/g, '')
        .trim(); // 去除at部分
      const type = await reply(
        '如果用户想进行画图操作，一切与画画有关系的，就回复绘画，如果用户是想询问天气相关的，请回复天气：如果用户向询问星座相关的，请回复星座，如果用户让模型进行说某段故事，或者用说的行为进行操作的，一系列会发出声音的，请回复语音，如果以上都不是，就回复无法推测。根据以上条件和以下信息，推测用户行为，并且严格要求回复标准进行回复，内容如下',
        text,
      );
      console.log(text, type);
      if (type.includes('绘画')) {
        message.say(`@${contact.name()}\n 绘画ing...`);
        replyImage(text).then((data) => {
          if (data) {
            const fileBox = FileBox.fromBuffer(data, 'image.png');
            message.say(fileBox);
          } else {
            setTimeout(() => {
              message.say('当前正在创作，请稍等。');
            }, 1000);
          }
        });
      } else if (type.includes('语音')) {
        replyAudio('情感丰富，回答下列问题：', text).then((data) => {
          if (data) {
            const fileBox = FileBox.fromBuffer(data, 'audio.wav');
            message.say(fileBox);
          } else {
            setTimeout(() => {
              message.say('当前正在创作，请稍等。');
            }, 1000);
          }
        });
      } else if (type.includes('星座')) {
        matchQuestion.getHoroscope(text).then((data) => message.say(`@${contact.name()}\n${data}`));
      } else if (type.includes('天气')) {
        matchQuestion.getWeather(text).then((data) => message.say(`@${contact.name()}\n${data}`));
      } else {
        assembleMessage(roomId + contact.name(), text, (data) => {
          console.log('回答：', data);
          message.say(`@${contact.name()}\n${data}`);
        });
      }
    },
    [bot.Message.Type.Image]: async (bot, message) => {
      // 处理图片消息
    },
    [bot.Message.Type.Audio]: async (bot, message) => {
      // 处理语音消息
    },
    [bot.Message.Type.Video]: async (bot, message) => {
      // 处理视频消息
    },
    [bot.Message.Type.Emoticon]: async (bot, message) => {
      // 处理表情消息
    },
    [bot.Message.Type.File]: async (bot, message) => {
      // 处理文件消息
    },
    [bot.Message.Type.Url]: async (bot, message) => {
      // 处理链接消息
    },
    [bot.Message.Type.MiniProgram]: async (bot, message) => {
      // 处理小程序消息
    },
    [bot.Message.Type.Transfer]: async (bot, message) => {
      // 处理转账消息
    },
    [bot.Message.Type.RedEnvelope]: async (bot, message) => {
      // 处理红包消息
    },
    [bot.Message.Type.ContactCard]: async (bot, message) => {
      // 处理名片消息
    },
    [bot.Message.Type.Location]: async (bot, message) => {
      // 处理位置消息
    },
  };

  // 默认策略处理未知类型的消息
  const defaultStrategy = (bot, message) => {
    // 处理未知类型的消息
  };

  // 执行策略
  function handleMessage(bot, message) {
    const type = message.type();
    const strategy = messageStrategies[type] || defaultStrategy;
    strategy(bot, message);
  }
  return handleMessage;
};
