import axios from 'axios';

export const generate = (prefix, prompt) => {
  return axios
    .post('http://127.0.0.1:8766/generate', { prefix, prompt })
    .then((res) => res.data)
    .catch(function (error) {
      console.log(error);
    });
};
export const chat = (messages) => {
  return axios
    .post('http://127.0.0.1:8766/chat', { messages })
    .then((res) => res.data)
    .catch(function (error) {
      console.log(error);
    });
};

export const chatApp = (messages) => {
  return axios
    .post('http://127.0.0.1:8766/app/chat', { messages })
    .then((res) => res.data)
    .catch(function (error) {
      console.log(error);
    });
};
export const chatRole = (prompt, chatHistory = [], appId = '', agentKey = '') => {
  return axios
    .post('http://127.0.0.1:8766/role/chat', { prompt, chatHistory, appId, agentKey })
    .then((res) => res.data.content)
    .catch(function (error) {
      console.log(error);
    });
};

export const generateAudio = (prefix, prompt) => {
  return axios
    .post(
      'http://127.0.0.1:8766/audio',
      {
        prefix,
        prompt,
      },
      {
        responseType: 'arraybuffer',
      },
    )
    .then((res) => res.data)
    .catch((error) => console.log(error));
};

export const generateImage = (prompt) => {
  return axios
    .post('http://127.0.0.1:8766/draw', {
      prompt,
    })
    .then((res) => axios.get(res.data[0].url, { responseType: 'arraybuffer' }))
    .then((res) => res.data);
};
