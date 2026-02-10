// Problem Description – Abortable Async Pipeline
//
// You are required to implement an async pipeline that executes
// an array of async functions sequentially (waterfall execution).
//
// The pipeline must support cancellation using AbortController.
// If the abort signal is triggered:
// 1. Execution must stop immediately
// 2. Any pending async operation should be aborted
// 3. The pipeline must throw an AbortError
//
async function runPipeline(fns, signal) {
  let p = Promise.resolve();

  for (let f of fns) {
    p = p.then(() => {
      if (signal.aborted) {
        throw new Error("Abort");
      }
      return f();
    });
  }

  return await p;
}

module.exports = runPipeline;
