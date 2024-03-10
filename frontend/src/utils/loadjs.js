import loadjs from 'loadjs';

export const loadJs = (url) =>
  new Promise((resolve, reject) => {
    loadjs(url, {
      success: () => {
        resolve('success');
      },
      error: (err) => {
        reject(err);
      },
    });
  });

export default loadJs;
