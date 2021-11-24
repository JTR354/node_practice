const http = require("http");
const fs = require("fs");
const path = require("path");

const app = http.createServer((req, res) => {
  /**
   * 1. 返回 html
   * 2. xhr 接口请求
   * 3. 静态资源服务
   */
  const fileUrl = "." + req.url;
  if (req.url === "/") {
    fs.readFile("./index.html", (err, data) => {
      if (err) {
        console.log(err);
        res.end(500);
        throw new Error(err);
      }
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });
  } else if (req.url.startsWith("/api")) {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ abc: "123" }));
  } else if (req.headers.accept.includes("image/*") && fs.existsSync(fileUrl)) {
    const [, suffix] = req.url.replace("/").split(".");
    res.writeHead(200, { "Content-Type": "image/" + suffix });
    const rs = fs.createReadStream(fileUrl);
    rs.pipe(res);
  } else {
    res.end("end else");
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`server at ${PORT}`);
});
