import axios from "axios";
const baseUrl = "http://127.0.0.1:4433";
const request = ({ url, method = "post", data, headers }) => {
  return axios({
    url: baseUrl + url,
    method,
    data,
    headers,
  })
    .then((response) => {
      // Handle the response however you prefer here

      return response.data?.data;
    })
    .catch((error) => {
      // Error handling
      console.error("Error:", error.response ? error.response.data : error.message);
      throw error; // Re-throw the error for further handling if necessary
    });
};

export const chat = (params) => {
  return request({
    url: "/wx/message",
    method: "post",
    data: params,
  });
};

export const uploadWxData = (params) => {
  return request({
    url: "/wx/resource/upload",
    data: params,
  });
};

export const getTasks = () => {
  return request({
    url: "/wx/task/list",
  });
};

export const activeTask = (id) => {
  return request({
    url: "/task/active",
    data: { id },
  });
};
