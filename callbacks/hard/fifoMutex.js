// Problem Description – Fair FIFO Mutex
//
// Implement a Mutex to control access to an async resource.
//
// Only one task may run at a time. Extra tasks must wait in a queue
// and be executed in FIFO order.
//
// When a task finishes, the lock should be released automatically
// and the next queued task should start.
//
// Requirements:
// - Run immediately if free.
// - Queue when locked (FIFO).
// - Auto-release on task completion.
class Mutex {
  constructor() {
    this.q = [];
    this.locked = false;
  }

  lock(task, onComplete) {
    if (this.locked) {
      this.q.push(() => {
        task((err, res) => {
          onComplete(err, res);
          this._release();
        });
      });
    } else {
      this.locked = true;
      task((err, res) => {
        onComplete(err, res);
        this._release();
      });
    }
  }

  _release() {
    this.locked = false;
    if (this.q.length > 0) {
      this.locked = true;
      let t = this.q.shift();
      t();
    }
  }
}

module.exports = Mutex;
