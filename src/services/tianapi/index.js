import axios from "axios";

// 创建一个 axios 实例
const instance = axios.create({
  baseURL: "https://apis.tianapi.com",
  params: {
    key: "1f05c22e289b9e49281950e02e1bbece",
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
  return request("get", "/star/index", {
    astro: "taurus",
  }).then((res) => res.result.list);
};

// 生活小段子
export const getLifeStory = () => {
  return request("get", "/mnpara/index").then((res) => res.result.content);
};
