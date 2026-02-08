// Problem Description – Time-Limited Async Function

// You are given an asynchronous function and a time limit t in milliseconds.
// Your task is to wrap this function so that it either resolves normally if it completes within the given time or rejects
// with the message "Time Limit Exceeded" if execution takes longer than t.
function timeLimit(fn, t) {
  return (...args) =>
    Promise.race([
      fn(...args),
      new Promise((res, rej) => {
        setTimeout(() => {
          rej("Time Limit Exceeded");
        }, t);
      }),
    ]);
}

module.exports = timeLimit;
