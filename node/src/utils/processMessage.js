import { chat, reply } from "../modules/AI/index.js";

const messageQueues = {};
// const reply = await chat();
let l = 0;
const processNext = async (roomId) => {
    if (messageQueues[roomId] && messageQueues[roomId].length > 0) {
        const { text, callback } = messageQueues[roomId][0]; // 取出队列中第一条消息
        const response = await reply("回复", text);

        callback(response?.response || response);
        messageQueues[roomId].shift(); // 处理完毕后移除队列中的该消息
        if (messageQueues[roomId].length) {
            processNext(roomId); // 如果队列中还有消息，则继续处理下一条
        } else {
            delete messageQueues[roomId];
        }
    }
};

const enqueueMessage = async (roomId, text, callback) => {
    if (!messageQueues[roomId]) {
        messageQueues[roomId] = [];
    }
    messageQueues[roomId].push({ text, callback });

    if (messageQueues[roomId].length === 1) {
        processNext(roomId); // 如果是队列中的第一条消息，则立即处理
    }
};
const test = () => {
    enqueueMessage(1, "1 + 1多少", (data) => {
        console.log("回答：", data);
    });
    enqueueMessage(2, "5 + 1多少", (data) => {
        console.log("回答：", data);
    });
    enqueueMessage(3, "4 + 1多少", (data) => {
        console.log("回答：", data);
    });
    enqueueMessage(4, "2 + 1多少", (data) => {
        console.log("回答：", data);
    });
    enqueueMessage(5, "3 + 1多少", (data) => {
        console.log("回答：", data);
    });
};
// test();
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
            enqueueMessage(roomId + contact.name() + `${l++}`, text, (data) => {
                console.log("回答：", data);
                message.say(`@${contact.name()}\n${data}`);
            });
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
