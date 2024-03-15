import axios from 'axios';

const request = ({ url, method, data, headers }) => {
  return axios({
    url,
    method,
    data,
    headers,
  })
    .then((response) => {
      // Handle the response however you prefer here
      console.log('Data:', response.data);
      return response.data;
    })
    .catch((error) => {
      // Error handling
      console.error('Error:', error.response ? error.response.data : error.message);
      throw error; // Re-throw the error for further handling if necessary
    });
};

export const reply = (params) => {
  return request({
    url: 'http://127.0.0.1:4433/reply',
    method: 'post',
    data: params,
  });
};

export const uploadWxData = (params) => {
  return request({
    url: 'http://127.0.0.1:4433/resource/upload',
    method: 'post',
    data: params,
  });
};
