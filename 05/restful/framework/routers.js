const { init, get, create, update, del, list, page } = require("./api");
const Router = require("koa-router");
const router = new Router();
// url logic
router.get("/api/:list/:id", init, get);
router.get("/api/:list", init, page);
router.post("/api/:list", init, create);
router.put("/api/:list/:id", init, update);
router.delete("/api/:list/:id", init, del);
// router.get("/api/:list", init, page);

module.exports = router.routes();
