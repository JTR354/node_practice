const Koa = require("koa");
const config = require("./conf");
const restful = require("./framework/routers");
const bodyParser = require("koa-bodyparser");

const app = new Koa();
const { loadModel } = require("./framework/loader");
loadModel(config)(app);
app.use(bodyParser());
app.use(restful);

app.listen(3000, () => {
  console.log(`port at 3000`);
});
