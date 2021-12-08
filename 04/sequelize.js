(async () => {
  const Sequelize = require("sequelize");
  const sequelize = new Sequelize("runoob", "root", "root", {
    host: "localhost",
    dialect: "mysql",
    operatorAliases: false,
  });
  // Define
  const Fruit = sequelize.define("Fruit", {
    name: { type: Sequelize.STRING(20), allowNull: false },
    price: { type: Sequelize.FLOAT, allowNull: false },
    stock: { type: Sequelize.INTEGER, defaultValue: 0 },
  });
  // Check in
  let ret = await Fruit.sync();
  console.log(ret, "sync");
  ret = await Fruit.create({ name: "香蕉", price: 1.5 });
  console.log(ret, "create banana");
  ret = await Fruit.findAll();
  await Fruit.update({ price: 4 }, { where: { name: "香蕉" } });
  console.log("findAll", ret);
  const Op = Sequelize.Op;
  ret = await Fruit.findAll({
    where: {
      price: {
        [Op.lt]: 6,
        [Op.gt]: 2,
      },
    },
  });
  console.log("findAll 2", JSON.stringify(ret, "", "\t"));
})();
