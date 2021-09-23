import axios from 'axios';

export default function timeout(promise) {
  const {
    url, options, time = 20000,
    error_message = 'Timeout Exceeded'
  } = promise;
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new Error(error_message))
    }, time);
    axios(url, options).then(
      (res) => {
        clearTimeout(timeoutId);
        resolve(res);
      },
      (err) => {
        clearTimeout(timeoutId);
        reject(err);
      }
    );
  })
}