const Sequelize = require("sequelize");
const env = require("dotenv");

// const conf = require("./conf");
env.config({ path: ".env" });
const { DATABASE, USER_NAME, PASSWORD, HOST } = process.env;
console.log(DATABASE, USER_NAME, PASSWORD, HOST);
const sequelize = new Sequelize(DATABASE, USER_NAME, PASSWORD, {
  HOST,
  dialect: "mysql",
  operatorsAliases: false,
});

module.exports = sequelize;
