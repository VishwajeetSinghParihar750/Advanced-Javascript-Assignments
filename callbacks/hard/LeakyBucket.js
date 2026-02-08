// Problem Description – Leaky Bucket Rate Limiter
//
// You are required to implement a RateLimiter based on the Leaky Bucket algorithm.
//
// The rate limiter has a fixed capacity and processes tasks at a constant rate.
// Tasks are executed in the exact order they are received.
//
// Requirements:
// 1. The bucket has a maximum capacity
// 2. Tasks are processed at a fixed interval (leak rate)
// 3. If the bucket is full, new tasks must be rejected immediately
// 4. Fairness must be preserved (FIFO execution)

class LeakyBucket {
  constructor(capacity, leakRateMs) {
    this.capacity = capacity;
    this.leakRateMs = leakRateMs;
    this.q = [];
    this._process();
  }

  add(task, onComplete) {
    if (this.q.length == this.capacity)
      onComplete(new Error("Rate Limit Exceeded"), null);
    else {
      this.q.push(() => {
        task(onComplete);
      });
    }
  }

  _process() {
    setInterval(() => {
      if (this.q.length > 0) {
        let f = this.q.shift();
        f();
      }
    }, this.leakRateMs);
  }
}

module.exports = LeakyBucket;
