/**
 *  1. 优雅api
 *  2. AOP
 *  3. 策略
 */
const Koa = require("koa");
const app = new Koa();

// app.use(async (ctx, next) => {
//   console.time();
//   await next();
//   console.timeEnd();
// });

app.use((ctx, next) => {
  ctx.body = "hello koa";
});

app.listen(3000, () => {
  console.log(`server at port:3000`);
});
