import schedule from "node-schedule";
import * as T from "../../services/tianapi/index.js";
import * as AI from "../AI/index.js";

export const processData = async () => {
  let [news, weather, almanac, horoscope, lifestory] = await Promise.all([
    T.getNews(),
    T.getWeather(),
    T.getAlmanac(),
    T.getHoroscope(),
    T.getLifeStory(),
  ]);

  [weather, news, almanac, horoscope] = await Promise.all([
    AI.reply(
      "请解析以下内容，并提取天气主要信息，简练总结出一段话，不要超过30个字。回复需要生动一点，不要机器化",
      JSON.stringify(weather)
    ),

    AI.reply(
      "请解析以下内容，并提取数据信息，然后总结新闻的事件和发生时间，只需要时间和事件，分条列出来，排版要清晰，严格按照格式不需要额外添加要素，例如：1. 2021年11月10日，某某在某地干什么干什么。",
      JSON.stringify(news)
    ),
    AI.reply(
      "请解析以下内容，并提取主要信息，简练总结出一段话，不要超过60个字。回复需要生动一点，不要机器化",
      JSON.stringify(almanac)
    ),

    AI.reply(
      "请解析以下内容，并提取主要信息，简练总结出一段话。回复需要生动一点，不要机器化",
      JSON.stringify(horoscope)
    ),
  ]);
  return `【今日天气】\n--${weather}\n\n【黄历】\n--${almanac}\n\n【星座运势】\n--${horoscope}\n\n【今日新闻】\n${news}\n\n【心灵鸡汤】\n--${lifestory}`;
};

async function initRoomTask(bot) {
  // 抽象出发送消息的函数
  async function sendMessageToAllRooms(bot, message) {
    const roomList = await bot.Room.findAll();
    for (let room of roomList) {
      try {
        await room.say(`@所有人\n${message}`);
      } catch (e) {
        console.error(`Error: ${e.message}`);
      }
    }
  }

  // 抽象出任务调度函数
  async function scheduleMessage(bot, cronString, messageFunc) {
    schedule.scheduleJob(cronString, async () => {
      const message = await messageFunc();
      await sendMessageToAllRooms(bot, message);
    });
  }
  async function createScheduleTask(bot, cronString, prefix, prompt) {
    scheduleMessage(
      bot,
      cronString,
      async () => await AI.reply(prefix, prompt)
    );
  }

  const tasks = [
    {
      cronTime: "0 0 12 * * *",
      prefix: "来一段中午十二点的问好，提醒吃饭",
      prompt: "面对群友，情感丰富，但是简洁一点",
    },
    {
      cronTime: "0 0 14 * * *",
      prefix: "来一段下午二点的问好",
      prompt: "面对群友，情感丰富，但是简洁一点",
    },
    {
      cronTime: "0 0 18 * * *",
      prefix: "来一段下午六点的问好，提醒吃饭",
      prompt: "面对群友，情感丰富，但是简洁一点",
    },
    {
      cronTime: "0 0 21 * * *",
      prefix: "来一段晚上九点点的问好",
      prompt: "面对群友，情感丰富，但是简洁一点",
    },
    {
      cronTime: "0 0 0 * * *",
      prefix: "来一段晚上十二点的晚安问好",
      prompt: "面对群友，情感丰富，但是简洁一点",
    },
  ];

  scheduleMessage(bot, "0 0 9 * * *", async () => await processData());
  tasks.forEach((i) => createScheduleTask(bot, i.cronTime, i.prefix, i.prompt));
  console.log("开启定时任务！");

  // test
  const test = async () => {
    const message = await processData();
    await sendMessageToAllRooms(bot, message);
  };
  test()
}
function initPersonTask(bot) {
  // 用户配置
  const userConfigs = [
    {
      name: "微醺的香菜", // 用户的ID或标识符
      message: "现在是早上九点，随机创建一个英语短句子进行提供给我进行学习", // 要发送的消息内容
      cronTime: "0 0 9 * * *", // 每天早上9点执行
    },
    {
      name: "微醺的香菜", // 用户的ID或标识符
      message: "现在是晚上上九点，询问一下今天有没有学习英语", // 要发送的消息内容
      cronTime: "0 0 21 * * *", // 每天早上9点执行
    },
    {
      name: "嘎", // 用户的ID或标识符
      message: "现在是早上九点，随机创建一个英语短句子进行提供给我进行学习", // 要发送的消息内容
      cronTime: "0 0 9 * * *", // 每天早上9点执行
    },
    {
      name: "嘎", // 用户的ID或标识符
      message: "现在是晚上上九点，询问一下今天有没有学习英语", // 要发送的消息内容
      cronTime: "0 0 21 * * *", // 每天早上9点执行
    },
  ];

  // 发送消息的函数
  async function sendMessageToUser(bot, name, message) {
    try {
      const contact = await bot.Contact.find({
        name,
      });

      if (contact) {
        await contact.say(message);
      } else {
        console.error("未找到指定用户");
      }
    } catch (e) {
      console.error(`Error: ${e.message}`);
    }
  }

  // 定时任务
  userConfigs.forEach((userConfig) => {
    schedule.scheduleJob(userConfig.cronTime, async () => {
      const message = await AI.reply(
        "以一个知识渊博的学者身份进行辅助",
        userConfig.message
      );
      sendMessageToUser(bot, userConfig.name, message);
    });
  });

  console.log("开启单人消息定时任务！");

  //test
  const test = async (name = "微醺的香菜", a = "询问今天学了些什么？") => {
    try {
      const message = await AI.reply("用温柔的语气", a);

      const contact = await bot.Contact.find({
        name,
      });

      if (contact) {
        await contact.say(message);
      } else {
        console.error("未找到指定用户");
      }
    } catch (e) {
      console.error(`Error: ${e.message}`);
    }
  };
  test();
}
export async function startScheduledTasks(bot) {
  initRoomTask(bot);
  initPersonTask(bot);
}


