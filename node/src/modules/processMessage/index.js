import { createChat, reply } from "../AI/qwen.js";
import * as T from "../../services/tianapi/index.js";

const { assembleMessage } = createChat();

const matchQuestion = {
    getPoint: async () => {
        const res = await reply(
            "你是一个智能机器人，基于阿里模型，固定词语匹配有星座，天气，也就是说，当问题里包含这些字的时候，会触发这些接口的调用，从而输出实时的信息，除了这些，你还会简单的回复",
            "基于以上进行自我介绍"
        );
        return res;
    },
    getWeather: async (text) => {
        const weather = await reply(
            "提取出该文本所说的城市，只需要城市，如果有多个城市，请用&分割",
            text
        );
        const res = await Promise.all(
            weather.split("&").map((i) => T.getWeather(i))
        );
        return reply(
            "下面是一些天气信息，请总结描述，对于同一个城市的描述不要超过30字，并且不同城市需要分割显示，如果一个城市的话，就只需要显示一个城市就行，不需要过多举例，内容如下：",
            JSON.stringify(res)
        );
    },
    getHoroscope: async (text) => {
        const hor = await reply(
            "提取出该文本所说的星座，只需要星座，如果有多个星座，请用&分割，如果少了座这个字的话，需要补充完整为某某座,内容如下：",
            text
        );
        console.log(hor);
        const res = await Promise.all(
            hor.split("&").map((i) => T.getHoroscope(i))
        );
        return reply(
            "下面是一些星座，请总结描述，对于同一个星座的描述不要超过50字，并且不同星座需要分割显示，如果一个星座的话，就只需要显示一个星座就行，不需要过多举例",
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
            const type = await reply(
                "根据以下文本判断本次询问属于星座,天气,功能,无法推测中的哪一个，只需要单独回复给我，不需要过多解释，比如：判断为询问星座时，返回星座，判断为询问天气时返回天气，无法判断则返回无法推测即可，内容如下：",
                text
            );
            console.log(text, type);
            if (type.includes("功能")) {
                matchQuestion
                    .getPoint()
                    .then((data) => message.say(`@${contact.name()}\n${data}`));
            } else if (type.includes("星座")) {
                matchQuestion
                    .getHoroscope(text)
                    .then((data) => message.say(`@${contact.name()}\n${data}`));
            } else if (type.includes("天气")) {
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
const a = (text) =>
    reply(
        "根据以下文本判断本次询问属于星座,天气,功能,无法推测中的哪一个，只需要单独回复给我，不需要过多解释，比如：判断为询问星座时，返回星座，判断为询问天气时返回天气，无法判断则返回无法推测即可，内容如下：",
        text
    ).then((res) => console.log(res));
// a("水瓶呢");
// a("水瓶呢");
// a("水瓶呢");
// a("水瓶呢");
// a("长沙太阳好吗");
// a("长沙太阳好吗");
// a("长沙太阳好吗");
// a("长沙太阳好吗");
// a("长沙太阳好吗");