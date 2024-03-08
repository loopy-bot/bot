import { createChat, reply } from "../AI/qwen.js";
import * as T from "../../services/tianapi/index.js";

const { assembleMessage } = createChat();

const matchQuestion = {
    getWeather: async (text) => {
        const weather = await reply(
            "提取出该文本所说的城市，只需要城市，如果有多个城市，请用&分割",
            text
        );
        const res = await Promise.all(
            weather.split("&").map((i) => T.getWeather(i))
        );
        return reply(
            "下面是一些天气信息，请总结描述，对于同一个城市的描述不要超过30字，并且不同城市需要分割显示",
            JSON.stringify(res)
        );
    },
};

export const createProcessMessage = (bot) => {
    // 定义策略对象
    const messageStrategies = {
        [bot.Message.Type.Text]: async (bot, message) => {
            // 处理文本消息
            const room = await message.room();
            const roomId = room ? room.id : "personal";
            const contact = message.talker();
            const text = message
                .text()
                .replace(/@\S+\s/g, "")
                .trim(); // 去除at部分
            console.log("问题：", text);

            if (text.includes("天气")) {
                matchQuestion
                    .getWeather(text)
                    .then((data) => message.say(`@${contact.name()}\n${data}`));
            } else {
                assembleMessage(roomId + contact.name(), text, (data) => {
                    console.log("回答：", data);
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

// test
const test = () => {
    assembleMessage(1, "你会什么", (data) => {
        console.log("回答：", data);
    });
    assembleMessage(2, "5 + 1多少", (data) => {
        console.log("回答：", data);
    });
    assembleMessage(2, "4 + 1多少", (data) => {
        console.log("回答：", data);
    });
    assembleMessage(1, "随机来个小点", (data) => {
        console.log("回答：", data);
    });
    assembleMessage(5, "3 + 1多少", (data) => {
        console.log("回答：", data);
    });
};
// test();
