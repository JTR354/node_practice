const { EventEmitter } = require("events");
const { MongoClient } = require("mongodb");
const config = require("./conf");

class Mongodb {
  constructor(conf) {
    this.conf = conf;
    this.emmiter = new EventEmitter();
    this.client = new MongoClient(this.conf.url, { useNewUrlParser: true });
    this.client.connect((err) => {
      if (err) throw err;
      console.log(`opened`);
      this.emmiter.emit("connect");
    });
  }
  col(colName, dbName = this.conf.dbName) {
    return this.client.db(dbName).collection(colName);
  }
  once(eventName, cb) {
    this.emmiter.once(eventName, cb);
  }
  close() {
    this.client.close();
  }
}

module.exports = new Mongodb(config);
