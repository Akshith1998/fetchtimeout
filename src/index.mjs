const fetchWithTimeout = (url, time) => {
  let controller = new AbortController();
  let signal = controller.signal;
  let timerId = null;
  return new Promise((resolve, reject) => {
    fetch(url, { signal })
      .then((res) => res.json())
      .then((res) => {
        clearTimeout(timerId);
        resolve(res);
      })
      .catch((err) => reject(err));

    timerId = setTimeout(() => {
      controller.abort();
      reject(new Error("Timed out"));
    }, time);
  });
};

fetchWithTimeout("https://jsonplaceholder.typicode.com/todos/1", 100)
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
