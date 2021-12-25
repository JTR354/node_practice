(async () => {
  const Sequelize = require("sequelize");
  const sequelize = new Sequelize("runoob", "root", "root", {
    host: "localhost",
    dialect: "mysql",
    operatorAliases: false,
  });
  // Define
  const Fruit = sequelize.define(
    "Fruit",
    {
      id: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV1,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(20),
        allowNull: false,
        get() {
          const fname = this.getDataValue("name");
          const price = this.getDataValue("price");
          const stock = this.getDataValue("stock");
          return `${fname}(价格:¥${price} 库存: ${stock}kg)`;
        },
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: false,
        validate: {
          isFloat: { msg: "价格字段请输入数字" },
          min: { args: [0], msg: "价格字段必须大于0" },
        },
      },
      stock: { type: Sequelize.INTEGER, defaultValue: 0 },
    },
    {
      timestamps: false,
      getterMethods: {
        amount() {
          return this.getDataValue("stock") + "kg";
        },
      },
      setterMethods: {
        amount(val) {
          const idx = val.indexOf("kg");
          const v = val.slice(0, idx);
          this.setDataValue("sock", v);
        },
      },
    }
  );
  Fruit.classify = function (name) {
    const tropicFruit = ["香蕉", "芒果", "椰子"];
    return tropicFruit.includes(name) ? "热带水果" : "其他水果";
  };
  Fruit.prototype.totalPrice = function (count) {
    return (this.price * count).toFixed(2);
  };
  // Check in
  let ret = await Fruit.sync({ force: true });
  // console.log(ret, "sync");
  ret = await Fruit.create({ name: "香蕉", price: 3.5 });

  ret = await Fruit.findAll();
  console.log(ret.amount, 8e8);
  ret[0].amount = "150kg";
  await ret[0].save();
  ret = await Fruit.findAll();
  console.log(ret, ret.amount, 7e7);
  // console.log(f1.totalPrice(5), "====>");
  // ret = await Fruit.findOne({ where: { name: "香蕉" } });
  // console.log(ret.get(), 9e9);
  // console.log(ret, "create banana");
  // ret = await Fruit.findAll();
  // await Fruit.update({ price: 4 }, { where: { name: "香蕉" } });
  // console.log("findAll", ret);
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
