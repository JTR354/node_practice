class Router {
  constructor() {
    this.register = {
      get: {},
      post: {},
    };
  }

  get(url, middle) {
    this.register.get[url] = middle;
  }
  post(url, middle) {
    this.register.post[url] = middle;
  }
  routes() {
    return async (ctx, next) => {
      let fn = this.register;
      [ctx.method, ctx.url].forEach((key) => {
        fn = fn[key];
      });
      if (fn) {
        fn(ctx, next);
        return;
      }
      await next();
    };
  }
}

module.exports = Router;
