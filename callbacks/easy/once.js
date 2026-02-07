// Problem Description – once(fn)
//
// You are required to implement a wrapper function named once that accepts a
// callback-based asynchronous function `fn`.
// The wrapper should ensure that `fn` is executed only on the first call.
// Any subsequent calls should not re-execute `fn` and should instead invoke
// the callback with the same result (or error) from the first invocation.

function once(fn) {
  let called = false;
  let finished = false;

  let result = undefined,
    error = undefined;

  let cb_q = [];

  return (...args) => {
    let cb = args.pop();

    if (finished) {
      queueMicrotask(() => cb(error, result));
      return;
    }

    cb_q.push(cb);

    if (!called) {
      called = true;
      fn(...args, (err, res) => {
        finished = true;

        error = err;
        result = res;

        cb_q.forEach((c) => c(error, result));
        cb_q = [];
      });
    }
  };
}

module.exports = once;
