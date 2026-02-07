// Problem Description – Hedged Request
//
// You have a Primary async source and a Secondary backup.
// Start the Primary immediately. If it is slow, start the Secondary.
//
// Return the first successful result and ignore the rest.
// Only fail if both fail, and ensure the callback runs once.
//
// Requirements:
// - Start Primary immediately.
// - Start Secondary after timeoutMs if needed.
// - First success wins.
// - Callback must be called exactly once.
function hedgedRequest(primary, secondary, timeoutMs, onComplete) {
  let otherfail = false;
  let done = false;

  primary((err, res) => {
    if (!err) {
      if (!done) {
        done = true;
        onComplete(err, res);
      }
    } else {
      if (otherfail) onComplete(err, res);
      else otherfail = true;
    }
  });

  setTimeout(() => {
    secondary((err, res) => {
      if (!err) {
        if (!done) {
          done = true;
          onComplete(err, res);
        }
      } else {
        if (otherfail) onComplete(err, res);
        else otherfail = true;
      }
    });
  }, timeoutMs);
}

module.exports = hedgedRequest;
