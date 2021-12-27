const mongoose = require("mongoose");
const conf = require("./conf");
mongoose.connect(conf.url + "/" + conf.dbName, { useNewUrlParser: true });

const conn = mongoose.connection;

conn.on("error", () => console.error("connect failed...."));

conn.once("open", async () => {
  const Schema = mongoose.Schema({
    category: String,
    name: String,
  });

  const Model = mongoose.model("fruits", Schema);

  try {
    let r = await Model.create({
      category: "温带水果",
      name: "香蕉",
      price: 5.2,
    });
    console.log("inserted", r);

    r = await Model.find({ name: "香蕉" });
    console.log("fined", r);

    r = await Model.updateOne({ name: "香蕉" }, { $set: { name: "芒果" } });
    console.log("updated", r);

    r = await Model.deleteOne({ name: "苹果" });
    console.log("deleted", r);

    r = await Model.find({ category: "温带水果" });
    console.log("find category", r);
  } catch (e) {
    console.error(e);
  }
});
