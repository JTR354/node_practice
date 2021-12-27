const mongo = require("./db");

mongo.once("connect", async () => {
  const fruits = mongo.col("fruits");
  await fruits.deleteMany();
  await fruits.insertMany(
    new Array(100).fill().map((_, index) => {
      return {
        name: "X".repeat(6) + index,
        price: index,
        category: Math.random() > 0.5 ? "蔬菜" : "水果",
      };
    })
  );
  const r = await fruits.find().toArray();
  console.log(r);
  await mongo.close();
  console.log(`inserted`);
});
