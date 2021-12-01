const Koa = require("./lib/kkb-koa");
// const Koa = require("koa");

// const app = new Koa();
// function sleep(t = 1000) {
//   return new Promise((r) => setTimeout(r, t));
// }

// app.use(async (ctx, next) => {
//   const t = Date.now();
//   console.log(t, "start", ctx.url);
//   await sleep();
//   next();
//   console.log((Date.now() - t) / 1000, "end", ctx.url);
// });
// app.use((ctx) => {
//   console.log("body", ctx.url);
//   ctx.body = { a: 12553213 };
// });

// app.listen(3000, () => {
//   console.log(`server at: 3000`);
// });
const Router = require("./lib/router");
const app = new Koa();
const router = new Router();
router.get("/index", async (ctx) => (ctx.body = "index page"));
router.get("/post", async (ctx) => (ctx.body = "post page"));
router.post("/list", async (ctx) => (ctx.body = "list page"));
router.post("/index", async (ctx) => (ctx.body = "post index page"));

app.use(router.routes());

app.listen(3000);
