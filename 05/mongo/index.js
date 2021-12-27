const path = require("path");
const express = require("express");

const mongo = require("./db");

const app = express();

app.get("/", (req, res) => {
  res.sendFile(path.resolve("./index.html"));
});

app.get("/api/list", async (req, res) => {
  const { page, keyword, category, limit = 5 } = req.query;
  const col = mongo.col("fruits");
  const condition = {};
  if (category) {
    condition.category = category;
  }
  if (keyword) {
    condition.name = { $regex: new RegExp(keyword) };
  }
  const total = await col.find(condition).count();
  const fruits = await col
    .find(condition)
    .skip((page - 1) * limit)
    .limit(limit)
    .toArray();
  res.json({
    ok: 1,
    data: {
      fruits,
      pagination: {
        page,
        total,
      },
    },
  });
});

app.get("/api/category", async (req, res) => {
  const col = mongo.col("fruits");
  const data = await col.distinct("category");
  res.json({ ok: 1, data });
});

app.listen(3000, () => {
  console.log(`port at 3000`);
});
