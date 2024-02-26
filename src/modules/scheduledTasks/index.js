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
      "请解析以下内容，并提取数据，简练总结出一段话。回复需要生动一点，不要机器化",
      JSON.stringify(weather)
    ),

    AI.reply(
      "请解析以下内容，并提取数据信息，然后总结新闻的事件和发生时间，只需要时间和事件，分条列出来，排版要清晰，严格按照格式不需要额外添加要素，例如：1. 2021年11月10日，某某在某地干什么干什么。",
      JSON.stringify(news)
    ),
    AI.reply(
      "请解析以下内容，并提取数据，简练总结出一段话。回复需要生动一点，不要机器化",
      JSON.stringify(almanac)
    ),

    AI.reply(
      "请解析以下内容，并提取数据，简练总结出一段话。回复需要生动一点，不要机器化",
      JSON.stringify(horoscope)
    ),
  ]);
  return `【今日天气】\n--${weather}\n\n【黄历】\n--${almanac}\n\n【星座运势】\n--${horoscope}\n\n【今日新闻】\n${news}\n\n【心灵鸡汤】\n--${lifestory}`;
};

export async function startScheduledTasks(bot) {
  schedule.scheduleJob("0 0 9 * * *", async () => {
    // 每天早上9点执行
    const data = await processData();
    const roomList = await bot.Room.findAll(); // 获取所有群聊
    for (let room of roomList) {
      try {
        await room.say(data); // 发送消息
      } catch (e) {
        console.error(`Error: ${e.message}`);
      }
    }
  });

  // 中午十二点的任务
  schedule.scheduleJob("0 12 * * *", async () => {
    const data = await AI.reply("来一段中午十二点的问好", "情感丰富点");
    const roomList = await bot.Room.findAll(); // 获取所有群聊
    for (let room of roomList) {
      try {
        await room.say(data); // 发送消息
      } catch (e) {
        console.error(`Error: ${e.message}`);
      }
    }
  });

  // 下午两点的任务
  schedule.scheduleJob("0 14 * * *", async () => {
    const data = await AI.reply("来一段下午二点的问好", "情感丰富点");
    const roomList = await bot.Room.findAll(); // 获取所有群聊
    for (let room of roomList) {
      try {
        await room.say(data); // 发送消息
      } catch (e) {
        console.error(`Error: ${e.message}`);
      }
    }
  });

  // 晚上八点的任务
  schedule.scheduleJob("30 20 * * *", async () => {
    const data = await AI.reply("来一段晚上八点的问好", "情感丰富点");
    const roomList = await bot.Room.findAll(); // 获取所有群聊
    for (let room of roomList) {
      try {
        await room.say(data); // 发送消息
      } catch (e) {
        console.error(`Error: ${e.message}`);
      }
    }
  });

  // 晚上十一点的任务
  schedule.scheduleJob("0 23 * * *", async () => {
    const data = await AI.reply("来一段晚上十一点的问好", "情感丰富点");
    const roomList = await bot.Room.findAll(); // 获取所有群聊
    for (let room of roomList) {
      try {
        await room.say(data); // 发送消息
      } catch (e) {
        console.error(`Error: ${e.message}`);
      }
    }
  });
  console.log("开启定时任务！");
}
