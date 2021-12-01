const http = require("http");
const context = require("./context");
const request = require("./request");
const response = require("./response");
class KKoa {
  constructor() {
    this.middleWares = [];
  }
  use(cb) {
    this.middleWares.push(cb);
  }

  listen(...args) {
    const app = http.createServer(async (req, res) => {
      const ctx = this.createContext(req, res);
      const fn = this.compose(this.middleWares);
      await fn(ctx);
      res.end(ctx.body);
    });
    app.listen(...args);
  }
  createContext(req, res) {
    /**
     * 优雅的API, 代理 req, res
     * context 分别从request, response 取值
     * request, response 代理原生的req, res
     * 喵喵喵
     */
    const ctx = Object.create(context);
    ctx.request = Object.create(request);
    ctx.response = Object.create(response);
    ctx.req = request.req = req;
    ctx.res = response.res = res;
    return ctx;
  }

  compose(middleWares) {
    // 洋葱模型
    return function (ctx) {
      return dispatch(0);
      function dispatch(i) {
        const fn = middleWares[i];
        if (fn) {
          return Promise.resolve(
            fn(ctx, function next() {
              return dispatch(i + 1);
            })
          );
        }
        return Promise.resolve();
      }
    };
  }
}

module.exports = KKoa;
