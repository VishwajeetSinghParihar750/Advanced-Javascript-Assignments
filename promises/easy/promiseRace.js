// Problem Description – Custom Implementation of Promise.race

// You are required to implement your own version of Promise.race without using the built-in method.
// The function should accept an iterable of values that may include Promises or plain values.
// It must settle as soon as the first input settles, resolving or rejecting accordingly.
// Using Promise.resolve ensures non-promise values are handled correctly.
function promiseRace(promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      reject(new TypeError("not an array"));
      return;
    }
    if (promises.length == 0) {
      return;
    }
    let done = false;

    let cb = (err, res) => {
      if (done) return;
      done = true;
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    };
    for (let p of promises) {
      if (!done)
        Promise.resolve(p)
          .then((res) => cb(null, res))
          .catch((e) => cb(e, null));
    }
  });
}

module.exports = promiseRace;
