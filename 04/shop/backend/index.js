const sequelize = require("./util/database");

const User = require("./models/user");
const Product = require("./models/product");
const Order = require("./models/order");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");
const OrderItem = require("./models/order-item");

User.hasMany(Product);
User.hasOne(Cart);
User.hasMany(Order);

Product.belongsTo(User, {
  constraints: true,
  onDelete: "CASCADE",
});
Product.belongsToMany(Cart, {
  through: CartItem,
});
Product.belongsToMany(Order, {
  through: OrderItem,
});

Cart.belongsTo(User);
Cart.belongsToMany(Product, {
  through: CartItem,
});

Order.belongsTo(User);
Order.belongsToMany(Product, {
  through: OrderItem,
});

const Koa = require("koa");
const app = new Koa();
const bodyParser = require("body-parser");
app.use(require("koa-static")(__dirname + "/"));
app.use(bodyParser);
app.use(async (ctx, next) => {
  const user = await User.findByPk(1);
  ctx.user = user;
  await next();
});

const router = require("koa-router");
router.get("/admin/products", async (ctx, next) => {});
router.get("/cart", async (ctx, next) => {});
router.order("/orders", async (ctx) => {});
app.use(router.routes());

sequelize.sync({ force: false }).then(async (result) => {
  // console.log(result);
  let user = await User.findByPk(1);
  if (!user) {
    user = await User.create({ name: "jtr", email: "jtr354@foxmail.com" });
    await user.createCart();
  }
  app.listen(3000, () => {
    console.log("listen at port 3000");
  });
});
