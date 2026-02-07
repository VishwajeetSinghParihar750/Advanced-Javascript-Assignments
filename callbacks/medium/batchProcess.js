// Problem Description – Ordered Parallel Batcher
//
// You need to process many items in parallel, but with a fixed
// concurrency limit to avoid resource exhaustion.
//
// Tasks should start as soon as a slot is free, and the final
// results must preserve the original input order.
//
// Requirements:
// - Run at most `limit` workers in parallel.
// - Preserve the original order of results.
// - Start new work as soon as one finishes.
// - Stop and return an error if any task fails.

function batchProcess(items, limit, worker, onComplete) {
  //

  let len = items.length;

  if (len == 0) {
    onComplete(null, []);
    return;
  }

  let cur = limit;
  let done = 0;
  let results = [];

  let cb = (err, val, ind) => {
    if (!err) {
      results[ind] = val;
      done++;

      if (done == len) {
        onComplete(null, results);
      } else if (cur < len) {
        startworker(cur++);
      }
    } else onComplete(err, val);
  };

  let startworker = (ind) => {
    worker(items[ind], (err, val) => {
      cb(err, val, ind);
    });
  };

  for (let i = 0; i < Math.min(limit, len); i++) startworker(i);
}

module.exports = batchProcess;
