const fs = require('fs');

function promisify(original) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      args.push(function callback(err, ...values) {
        if (err) {
          return reject(err);
        }
        return resolve(...values);
      });
      original.call(this, ...args);
    });
  };
}

const fsPromise = promisify(fs.readFile);
console.log('fsPromise: ', fsPromise);

fsPromise('./package.json', 'utf8').then((res) => {
  console.log(res);
});
