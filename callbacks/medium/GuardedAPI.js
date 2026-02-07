// Problem Description – Async Initialization Gate
//
// You are required to design a mechanism for APIs that depend on an
// asynchronous initialization step.
// Any calls made before initialization completes should be queued and
// executed only after the initialization finishes.
// Calls made after initialization should execute immediately.
//
// The initialization task and API functions must invoke callbacks when
// they complete.
class GuardedAPI {
  constructor() {
    this.started = false;
    this.q = [];
  }

  init(initTask) {
    let cb = (err, res) => {
      if (!err) {
        this.started = true;
        this._flush();
      }
    };
    initTask(cb);
  }

  call(apiFn, onComplete) {
    let cb = (err, res) => {
      onComplete(err, res);
    };
    if (this.started) apiFn(cb);
    else
      this.q.push(() => {
        apiFn(cb);
      });
  }

  _flush() {
    for (let f of this.q) {
      f();
    }
    this.q = [];
  }
}

module.exports = GuardedAPI;
