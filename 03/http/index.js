const http = require("http");

function updateTime(t = 1000 * 10) {
  if (!this.timer) {
    this.time = new Date().toUTCString();
    this.timer = setInterval(() => {
      this.time = new Date().toUTCString();
    }, t);
  }
  return this.time;
}

http
  .createServer((req, res) => {
    res.statusCode = 200;
    if (req.url === "/") {
      res.end(`<html>
      <h1>Html update Time${updateTime()}</h1>
      <script src="/main"></script>
      </html>`);
    } else if (req.url === "/main") {
      const content = `document.writeln('<br> JS update time:${updateTime()}')`;
      // HTTP 1.0 时间戳差, 客户机 和 服务机
      /**
       * IE11 无效
       */
      // res.setHeader("Expires", new Date(Date.now() + 10 * 1000).toUTCString());
      // HTTP 1.1
      /**
       * cache-control
       */
      // res.setHeader("Cache-Control", "max-age=20");

      /*========================协商缓存=================================*/

      // 时间
      res.setHeader("Cache-Control", "no-cache");
      // res.setHeader("Last-Modified", new Date().toUTCString());
      // if (
      //   new Date(req.headers["if-modified-since"]).getTime() + 30 * 1000 >
      //   Date.now()
      // ) {
      //   console.log("缓存命中!");
      //   res.statusCode = 304;
      //   res.end();
      //   return;
      // }
      // 内容维度
      const crypto = require("crypto");
      const hash = crypto.createHash("sha1").update(content).digest("hex");
      res.setHeader("Etag", hash);
      if (req.headers["if-none-match"] === hash) {
        console.log("Etag 缓存命中...");
        res.statusCode = 304;
        res.end();
        return;
      }
      console.log(new Date(), 9e9);
      res.end(content);
    } else {
      res.end("");
    }
  })
  .listen(3000, () => {
    console.log("server at port: 3000");
  });
