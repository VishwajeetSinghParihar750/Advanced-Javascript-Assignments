// Problem Description – Custom Implementation of Promise.all

// You are required to implement your own version of Promise.all without using the built-in method.
// The function should accept an array of values that may include Promises or plain constants.
// It must resolve with an array of results in the same order once all inputs resolve, or reject immediately if any input rejects.
function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      reject(new TypeError("not an array"));
      return;
    }

    if (promises.length == 0) {
      resolve([]);
      return;
    }

    let got = 0;
    let results = [];
    let done = false;

    let cb = (err, res, ind) => {
      if (!err) {
        if (!done) {
          results[ind] = res;
          if (++got == promises.length) {
            resolve(results);
          }
        }
      } else {
        done = true;
        reject(err);
      }
    };

    for (let ind in promises) {
      let p = promises[ind];
      Promise.resolve(p)
        .then((res) => cb(null, res, ind))
        .catch((err) => cb(err, null, ind));
    }
  });
}

module.exports = promiseAll;
