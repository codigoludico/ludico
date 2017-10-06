export class Response {
  /**
   *
   * @param {XMLHttpRequest} xhr
   * @return {Response}
   */
  static fromXHR(xhr) {
    return new Response(xhr.status, xhr.response, new Map(xhr.getAllResponseHeaders().split("\n").map((v) => v.split(": "))));
  }

  constructor(status, body, headers) {
    this.status = status;
    this.body = body;
    this.headers = headers;
  }
}
