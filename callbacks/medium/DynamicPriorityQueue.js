// Problem Description – Priority Task Queue with Dynamic Concurrency
//
// You are required to implement a task queue that executes asynchronous
// tasks based on priority.
// Higher-priority tasks should be executed before lower-priority ones.
// The queue must enforce a concurrency limit, ensuring only a fixed number
// of tasks run at the same time.
// The concurrency limit can be updated dynamically while the system is running.
//
// Each task must invoke its callback when finished.
class DynamicPriorityQueue {
  constructor(concurrency) {
    this.q = [];
    this.active = 0;
    this.limit = concurrency;
  }

  setLimit(newLimit) {
    this.limit = newLimit;
    this.runNext();
  }

  add(task, priority, onComplete) {
    let cb = (err, val) => {
      if (!err) {
        this.active--;
        onComplete(null, val);
        this.runNext();
      } else onComplete(err, val);
    };

    if (this.limit > this.active) {
      this.active++;
      task(cb);
    } else {
      this.q.push({
        f: () => {
          task(cb);
        },
        p: priority,
      });
      this.q.sort((a, b) => a.p - b.p);
    }
  }

  runNext() {
    while (this.active < this.limit && this.q.length > 0) {
      let f = this.q.pop();
      this.active++;
      f.f();
    }
  }
}

module.exports = DynamicPriorityQueue;
