import axios from "axios";
import { TIAN_KEY } from '../../../config.js'
// 创建一个 axios 实例
const instance = axios.create({
  baseURL: "https://apis.tianapi.com",
  params: {
    key: TIAN_KEY,
  },
});

// 封装请求方法
const request = (method, url, params = {}) => {
  return instance({
    method,
    url,
    params,
  })
    .then((res) => res.data)
    .catch((error) => {
      console.error("请求出错:", error);
      throw error;
    });
};

// 获取新闻
export const getNews = () => {
  return request("get", "/allnews/index", {
    num: 10,
    col: 7,
  }).then((res) => res.result.newslist);
};

// 获取头条新闻
export const getTopNews = () => {
  return request("get", "/topnews/index").then((res) => res.result.list);
};

// 获取天气
export const getWeather = (city = "101250101") => {
  return request("get", "/tianqi/index", {
    city,
    type: 1,
  }).then((res) => res.result);
};

// 获取黄历
export const getAlmanac = () => {
  return request("get", "/lunar/index").then((res) => res.result);
};

// 获取星座运势
export const getHoroscope = () => {
  // 十二星座小写数组
  const zodiacSigns = [
    "白羊座",
    "金牛座",
    "双子座",
    "巨蟹座",
    "狮子座",
    "处女座",
    "天秤座",
    "天蝎座",
    "射手座",
    "摩羯座",
    "水瓶座",
    "双鱼座",
  ];

  // 生成一个随机数，范围在0到11之间（十二个星座）
  const randomIndex = Math.floor(Math.random() * zodiacSigns.length);

  // 随机抽取一个星座名称
  const randomZodiac = zodiacSigns[randomIndex];
  return request("get", "/star/index", {
    astro: randomZodiac,
  }).then((res) => res.result.list);
};

// 生活小段子
export const getLifeStory = () => {
  return request("get", "/mnpara/index").then((res) => res.result.content);
};
