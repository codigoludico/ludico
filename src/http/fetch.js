import Response from "./Response";

/**
 *
 * @param {String|URL} url
 * @param {Object} options
 * @return {Promise}
 */
export function fetch(url, opts = {}) {
  return new Promise((resolve, reject) => {
    const options = {
      method: "GET",
      url: url,
      responseType: "json",
      withCredentials: false,
      timeout: 0,
      headers: new Map(),
      body: undefined,
      ...opts
    };

    function handler(e) {
      const xhr = e.target;
      if (e.type === "load"
        || e.type === "error"
        || e.type === "timeout"
        || e.type === "abort") {
        xhr.removeEventListener("error", handler);
        xhr.removeEventListener("timeout", handler);
        xhr.removeEventListener("abort", handler);
        xhr.removeEventListener("load", handler);
      }
      if (e.type === "load") {
        return resolve(Response.fromXHR(xhr));
      } else if (e.type === "error"
        || e.type === "timeout"
        || e.type === "abort") {
        return reject(e.type);
      }
    }

    const xhr = new XMLHttpRequest();

    xhr.open(options.method, String(options.url));

    xhr.withCredentials = options.withCredentials;
    xhr.timeout = options.timeout;
    xhr.responseType = options.responseType;

    if (options.headers instanceof Map) {
      if (options.headers.size) {
        for (const [name, value] of options.headers) {
          xhr.setRequestHeader(name, value);
        }
      }
    } else {
      for (const name in options.headers) {
        const value = options.headers[name];
        xhr.setRequestHeader(name, value);
      }
    }

    xhr.addEventListener("abort", handler);
    xhr.addEventListener("error", handler);
    xhr.addEventListener("timeout", handler);
    xhr.addEventListener("load", handler);

    xhr.send(options.body);
  });
}

export default fetch;
