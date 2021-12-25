(async () => {
  const Sequelize = require("sequelize");
  const sequelize = new Sequelize("runoob", "root", "root", {
    host: "localhost",
    dialect: "mysql",
  });
  const Fruit = sequelize.define("fruit", { name: Sequelize.STRING });
  const Category = sequelize.define("category", { name: Sequelize.STRING });
  Fruit.FruitCategory = Fruit.belongsToMany(Category, {
    through: "FruitCategory",
  });
  await sequelize.sync({ force: true });
  await Fruit.create(
    {
      name: "香蕉",
      categories: [
        { id: 1, name: "热带" },
        { id: 2, name: "温带" },
      ],
    },
    {
      include: [Fruit.FruitCategory],
    }
  );
  const fruit = await Fruit.findAll();
  console.log(JSON.stringify(fruit, null, 2));
})();
