import Fly from 'flyio/dist/npm/fly';

const fly = new Fly();

export default function request (url, data) {
  return fly
    .request(url, data, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/octet-stream',
        accept: '*/*',
      },
    })
    .then((d) => {
      console.log('request result:', d);
    })
    .catch((e) => {
      console.log('error', e);
    });
};
