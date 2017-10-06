export class Request {
  constructor(url) {
    this.url = url;
    this.method = "POST";
    this.timeout = 0;
    this.withCredentials = false;
    this.responseType = "json";
    this.body = null;
    this.headers = new Map();
    this.callbacks = new Map();
    this.xhr = null;
  }

  handler = (e) => {
    const callback = this.callbacks.get(e.type);
    if (e.type === "load" || e.type === "abort" || e.type === "error") {
      xhr.removeEventListener("load", this.handler);
      xhr.removeEventListener("abort", this.handler);
      xhr.removeEventListener("error", this.handler);
      xhr.removeEventListener("timeout", this.handler);
      xhr.removeEventListener("progress", this.handler);
      if (e.type === "load") {
        return callback(Response.fromXHR(this.xhr));
      }
      return callback();
    } else if (e.type === "progress") {
      if (e.lengthComputable) {
        return callback({
          progress: e.loaded / e.total,
          loaded: e.loaded,
          total: e.total
        });
      }
      return callback({
        progress: NaN,
        loaded: NaN,
        total: NaN
      });
    }
  };

  set(name, value) {
    this.headers.set(name, value);
    return this;
  }

  on(type, callback) {
    this.callbacks.set(type, callback);
    return this;
  }

  off(...types) {
    if (types.length === 0) {
      this.callbacks.clear();
      return this;
    }
    for (const type of types) {
      this.callbacks.delete(type);
    }
    return this;
  }

  send() {
    const xhr = this.xhr = new XMLHttpRequest();
    xhr.open(this.method, this.url);
    xhr.withCredentials = this.withCredentials;
    xhr.timeout = this.timeout;
    if (this.headers.size > 0) {
      for (const [name, value] of this.headers) {
        xhr.setRequestHeader(name, value);
      }
    }
    xhr.addEventListener("load", this.handler);
    xhr.addEventListener("abort", this.handler);
    xhr.addEventListener("error", this.handler);
    xhr.addEventListener("timeout", this.handler);
    xhr.addEventListener("progress", this.handler);
    xhr.send(this.body);
  }
}
