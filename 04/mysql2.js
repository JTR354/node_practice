(async () => {
  const mysql = require("mysql2/promise");
  const cfg = {
    user: "root",
    password: "root",
    database: "runoob",
    host: "localhost",
  };
  const connection = await mysql.createConnection(cfg);
  const CREATE_SQL = `CREATE TABLE IF NOT EXISTS test (id INT NOT NULL AUTO_INCREMENT,message VARCHAR(45) NULL,PRIMARY KEY (id))`;
  const INSERT_SQL = `INSERT INTO test(message) VALUES(?)`;
  const SELECT_SQL = `SELECT * FROM test`;

  let ret = await connection.execute(CREATE_SQL);
  console.log(ret, "create");
  ret = await connection.execute(INSERT_SQL, ["abc"]);
  console.log(ret, "insert");
  const [row, fields] = await connection.execute(SELECT_SQL);
  console.log(row);
  connection.end();
})();
