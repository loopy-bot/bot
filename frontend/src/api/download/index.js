import Fly from 'flyio/dist/npm/fly';

const fly = new Fly();

export default function request ({ url }) {
  return new Promise((resolve, reject) => {
    fly.get(url, null, {
      responseType:"arraybuffer"
    })
    .then((data) => {
      resolve(data);
    })
    .catch((e) => {
      reject(e);
    });
  });
};
