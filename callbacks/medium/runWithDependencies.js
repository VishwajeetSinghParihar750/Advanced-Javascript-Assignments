// Problem Description – Task Execution with Dependencies
//
// You are given a set of asynchronous tasks where some tasks depend
// on the completion of others.
// Your goal is to execute each task only after all of its dependencies
// have been successfully completed.
// The solution should ensure correct execution order and handle
// dependency relationships properly.
//
// Each task is asynchronous and must invoke a callback when finished.
// Invoke finalCallback after all tasks have completed, or with an error
// if any task fails.

function runWithDependencies(tasks, finalCallback) {
  let runtask = (id, cb) => {
    let t = tasks.find((el) => el.id == id);

    t.q ??= [];

    if (t.done == true) {
      cb(t.err, t.res);
    } else if (t.started == true) {
      t.q.push(cb);
    } else {
      t.started = true;
      cleardeps(t.deps, (err, res) => {
        if (!err) {
          t.run((err, res) => {
            t.done = true;
            t.err = err;
            t.res = res;
            t.q.forEach((c) => c(t.err, t.res));
            t.q = [];
            cb(err, res);
          });
        }
      });
    }
  };

  let cleardeps = (deps, cb) => {
    if (deps.length == 0) cb(null);
    else {
      let lt = deps.pop();
      runtask(lt, (err) => {
        if (!err) cleardeps(deps, cb);
      });
    }
  };

  let done = 0;
  let finalres = {};
  let cb = (err, res, id) => {
    if (err) finalCallback(err, res);
    else {
      finalres[id] = res;
      if (++done == tasks.length) finalCallback(err, finalres);
    }
  };

  for (let task of tasks) {
    runtask(task.id, (err, res) => {
      cb(err, res, task.id);
    });
  }
}

module.exports = runWithDependencies;
