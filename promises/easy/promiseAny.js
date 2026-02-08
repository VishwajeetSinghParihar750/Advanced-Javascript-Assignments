// Problem Description – promiseAny(promises)

// You are required to implement a function named promiseAny that accepts an array of Promises.
// The function should return a new Promise that resolves immediately when any one of the input promises resolves successfully.
// If all the promises reject, the returned Promise should reject with an error.
function promiseAny(promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      reject(new TypeError("not an array"));
      return;
    }
    if (promises.length == 0) {
      reject(new Error("Empty iterable"));
      return;
    }
    let fail = 0;
    let done = false;

    let cb = (err, res) => {
      if (done) return;
      if (err) {
        if (++fail == promises.length) {
          reject(new Error("All promises were rejected"));
        }
      } else {
        done = true;
        resolve(res);
      }
    };
    for (let p of promises) {
      if (!done)
        Promise.resolve(p).then(
          (res) => cb(null, res),
          (rej) => cb(new Error("reject"), null),
        );
    }
  });
}

module.exports = promiseAny;
