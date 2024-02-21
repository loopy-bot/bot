// 导入封装后的函数
import {
  getNews,
  getTopNews,
  getWeather,
  getAlmanac,
  getHoroscope,
} from "./index.js";

// 测试获取新闻
getNews()
  .then((news) => {
    console.log("新闻列表:", news);
  })
  .catch((error) => {
    console.error("获取新闻出错:", error);
  });

// 测试获取头条新闻
getTopNews()
  .then((topNews) => {
    console.log("头条新闻列表:", topNews);
  })
  .catch((error) => {
    console.error("获取头条新闻出错:", error);
  });

// 测试获取天气
getWeather()
  .then((weather) => {
    console.log("天气信息:", weather);
  })
  .catch((error) => {
    console.error("获取天气信息出错:", error);
  });

// 测试获取黄历
getAlmanac()
  .then((almanac) => {
    console.log("黄历信息:", almanac);
  })
  .catch((error) => {
    console.error("获取黄历信息出错:", error);
  });

// 测试获取星座运势
getHoroscope()
  .then((horoscope) => {
    console.log("星座运势:", horoscope);
  })
  .catch((error) => {
    console.error("获取星座运势出错:", error);
  });
