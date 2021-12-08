const mysql = require("mysql");

const cfg = {
  host: "localhost",
  user: "root",
  password: "root",
  database: "runoob",
};

const conn = mysql.createConnection(cfg);

conn.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log("successful!");
    // action();
  }
});

// 查询 conn.query()
// 创建表
const CREATE_SQL = `CREATE TABLE IF NOT EXISTS test (
  id INT NOT NULL AUTO_INCREMENT,
  message VARCHAR(45) NULL,
  PRIMARY KEY (id))`;
const INSERT_SQL = `INSERT INTO test(message) VALUES(?)`;
const SELECT_SQL = `SELECT * FROM test`;

conn.query(CREATE_SQL, (err) => {
  if (err) {
    throw err;
  }
  conn.query(INSERT_SQL, "hello,world", (err, result) => {
    if (err) {
      throw err;
    } else {
      console.log(result, 9e9);
      conn.query(SELECT_SQL, (err, results) => {
        console.log(results);
        conn.end();
      });
    }
  });
});
