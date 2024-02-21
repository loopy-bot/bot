import schedule from "node-schedule";
import * as T from "../../services/tianapi/index.js";
import * as OpenAI from "../../utils/openai.js";
// getNews,
// getWeather,
// getAlmanac,
// getHoroscope,
const processData = async () => {
  let [news, weather, almanac, horoscope] = await Promise.all([
    T.getNews(),
    T.getWeather(),
    T.getAlmanac(),
    T.getHoroscope(),
  ]);
  // console.log();
  [weather, news, almanac, horoscope] = await Promise.all([
    OpenAI.reply(
      "请解析以下内容，并提取数据，简练总结出一段话。",
      JSON.stringify(weather)
    ),

    OpenAI.reply(
      "请解析以下内容，并提取数据中的时间和标题，分条列出来,例如：1. 2021年11月10日，某某在某地干什么干什么。",
      JSON.stringify(news)
    ),
    OpenAI.reply(
      "请解析以下内容，并提取数据，简练总结出一段话。",
      JSON.stringify(almanac)
    ),

    OpenAI.reply(
      "请解析以下内容，并提取数据，简练总结出一段话。",
      JSON.stringify(horoscope)
    ),
  ]);
  return `【今日天气】\n--${weather}\n\n【黄历】\n--${almanac}\n\n【星座运势】\n--${horoscope}\n\n【今日新闻】\n${news}`;
};

export async function startScheduledTasks(bot) {
  console.log("开启定时任务！");
  let data = "";
  schedule.scheduleJob("0 0 8 * * *", async () => {
    data = await processData();
  });
  schedule.scheduleJob("0 0 9 * * *", async () => {
    // 每天早上9点执行
    const roomList = await bot.Room.findAll(); // 获取所有群聊
    for (let room of roomList) {
      try {
        await room.say(data); // 发送消息
      } catch (e) {
        console.error(`Error: ${e.message}`);
      }
    }
  });
}
