// Problem Description – Sliding Window (Moving Average) Aggregator
//
// You are receiving a stream of numeric values asynchronously
// (e.g., sensor readings).
//
// Your task is to maintain a sliding window of the last N values
// and compute the moving average whenever a new value arrives.
//
// This problem tests state management and async data handling.
//
// Requirements:
// - Maintain only the last N values (fixed-size window).
// - Accept values asynchronously via a callback-style input.
// - On each new value, compute and emit the current average.
// - Before N values are received, compute the average
//   using only the available values.
function createWindowAggregator(windowSize, onWindowReady) {
  let v = [];
  let cursum = 0;

  return (val) => {
    v.push(val);
    cursum += val;

    if (v.length > windowSize) {
      cursum -= v.shift();
    }

    onWindowReady(cursum / v.length);
  };
}

module.exports = createWindowAggregator;
