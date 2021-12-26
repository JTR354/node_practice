const sequelize = require("./util/database");

const User = require("./models/user");
const Product = require("./models/product");
const Order = require("./models/order");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");
const OrderItem = require("./models/order-item");

const Koa = require("koa");
const Router = require("koa-router");
const app = new Koa();
const bodyParser = require("koa-bodyparser");
const { or } = require("sequelize/dist");
const router = new Router();
app.use(require("koa-static")(__dirname + "/"));
app.use(bodyParser());
app.use(async (ctx, next) => {
  const user = await User.findByPk(1);
  ctx.user = user;
  await next();
});
router.get("/admin/products", async (ctx, next) => {
  const products = await Product.findAll();
  ctx.body = { prods: products };
});

router.post("/admin/product", async (ctx) => {
  const body = ctx.request.body;
  await ctx.user.createProduct(body);
  ctx.body = { success: true };
});

router.delete("/admin/product/:id", async (ctx) => {
  const id = ctx.params.id;
  await Product.destroy({ where: { id } });
  ctx.body = { success: true };
});

router.get("/cart", async (ctx, next) => {
  const cart = await ctx.user.getCart();
  const products = await cart.getProducts();
  ctx.body = { products };
});

router.post("/cart", async (ctx, next) => {
  const body = ctx.request.body;
  const prodId = body.id;

  const cart = await ctx.user.getCart();
  let [product] = await cart.getProducts({ where: { id: prodId } });
  let quantity = 1;
  if (product) {
    quantity = product.cartItem.quantity + 1;
  } else {
    product = await Product.findByPk(prodId);
  }
  await cart.addProduct(product, { through: { quantity } });
  ctx.body = { success: true };
});

router.delete("/cartItem/:id", async (ctx) => {
  const id = ctx.params.id;
  const cart = await ctx.user.getCart();
  const [product] = await cart.getProducts({ where: { id } });
  if (product) {
    await product.cartItem.destroy();
  }
  ctx.body = { success: true };
});

router.get("/orders", async (ctx) => {
  const orders = await ctx.user.getOrders({
    include: ["products"],
    // order: ["createAt", "DESC"],
  });
  ctx.body = { orders };
});

router.post("/orders", async (ctx) => {
  const cart = await ctx.user.getCart();
  const products = await cart.getProducts();
  console.log(products);
  const p = products.map((item) => {
    item.orderItem = { quantity: item.cartItem.quantity };
    return item;
  });
  const order = await ctx.user.createOrder();
  await order.addProducts(p);
  await cart.setProducts(null);
  ctx.body = { success: true };
});

app.use(router.routes());

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

sequelize.sync({ force: false }).then(async () => {
  let user = await User.findByPk(1);
  if (!user) {
    user = await User.create({ name: "jtr", email: "jtr354@foxmail.com" });
    await user.createCart();
  }
  app.listen(3000, () => {
    console.log("listen at port 3000");
  });
});
