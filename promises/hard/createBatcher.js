// Problem Description – Request Batcher
//
// You are required to implement a batcher that groups multiple requests
// within a short time window into a single bulk request.
//
// Requirements:
// 1. Requests added within the batch window must be sent together
// 2. Each caller must receive only its own result
// 3. Only one network call should be made per batch window

function createBatcher(fetchBulk, delayMs = 50) {
  let isactive = false;

  let ids = [];
  let results = {};
  let errors = {};

  let f = () => {
    setTimeout(() => {
      fetchBulk(ids)
        .then((res) => {
          Object.keys(res).forEach((k) => {
            results[k](res[k]);
          });
        })
        .catch((err) => {
          Object.values(errors).forEach((v) => v(err));
        });
      isactive = false;
    }, delayMs);
  };

  return (id) => {
    if (!isactive) {
      isactive = true;
      ids = [];
      results = {};
      errors = {};
      f();
    }

    ids.push(id);
    return new Promise((res, rej) => {
      results[id] = res;
      errors[id] = rej;
    });
  };
}

module.exports = createBatcher;
