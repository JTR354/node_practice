const fs = require("fs");

function get(key) {
  fs.readFile("./db.json", (err, data) => {
    data = data.toString();
    const json = data ? JSON.parse(data) : {};
    console.log(json[key]);
  });
}

function set(key, val) {
  fs.readFile("./db.json", (err, data) => {
    data = data.toString();
    const json = data ? JSON.parse(data) : {};
    json[key] = val;
    fs.writeFile("./db.json", JSON.stringify(json), (err, data) => {
      if (err) {
        console.error("error");
        return;
      }
      console.log("写入成功!");
    });
  });
}

// set("hom", "jtr");
// set("user", "jtr");
// get("user");
