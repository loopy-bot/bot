import schedule from "node-schedule";
import * as T from "../../services/tianapi/index.js";
import * as AI from "../AI/index.js";

const processData = async () => {
  let [news, weather, almanac, horoscope] = await Promise.all([
    T.getNews(),
    T.getWeather(),
    T.getAlmanac(),
    T.getHoroscope(),
  ]);
  // console.log();
  [weather, news, almanac, horoscope] = await Promise.all([
    AI.reply(
      "请解析以下内容，并提取数据，简练总结出一段话。回复需要生动一点，不要机器化",
      JSON.stringify(weather)
    ),

    AI.reply(
      "请解析以下内容，并提取数据信息，只需要总结标题时间，分条列出来，排版要清晰，严格按照格式不需要额外添加要素，例如：1. 2021年11月10日，某某在某地干什么干什么。",
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
  return `【今日天气】\n--${weather}\n\n【黄历】\n--${almanac}\n\n【星座运势】\n--${horoscope}\n\n【今日新闻】\n${news}`;
};
const res = await processData();
console.log(res);
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
