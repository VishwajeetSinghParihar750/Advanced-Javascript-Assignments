// Problem Description – Asynchronous Worker Pool
//
// You are required to create a worker pool that manages the execution
// of asynchronous tasks.
// The pool should ensure that no more than N tasks are running concurrently,
// while any additional tasks are queued.
// As tasks complete, queued tasks should start automatically.
// Each task must invoke its callback with its result when finished.

class CallbackPool {
  constructor(limit) {
    this.active = 0;
    this.limit = limit;
    this.q = [];
  }

  run(task, onComplete) {
    let cb = (err, val) => {
      if (!err) {
        this.active--;
        onComplete();

        if (this.q.length > 0) {
          let f = this.q.pop();
          f();
        }
      }
    };

    if (this.active < this.limit) {
      this.active++;
      task(cb);
    } else
      this.q.push(() => {
        this.active++;
        task(cb);
      });
  }

  _next() {}
}

module.exports = CallbackPool;
