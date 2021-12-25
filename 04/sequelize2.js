(async () => {
  const Sequelize = require("sequelize");
  const sequelize = new Sequelize("runoob", "root", "root", {
    host: "localhost",
    dialect: "mysql",
    operatorAliases: false,
  });
  const Player = sequelize.define("player", { name: Sequelize.STRING });
  const Team = sequelize.define("team", { name: Sequelize.STRING });
  Player.belongsTo(Team);
  Team.hasMany(Player);
  await sequelize.sync({ force: true });
  await Team.create({ name: "火箭" });

  const team = await Team.findOne({
    where: { name: "火箭" },
    include: [Player],
  });
  const teamId = team.id;
  await Player.bulkCreate([
    { name: "姚明", teamId },
    { name: "麦迪", teamId },
  ]);
  const players = await Player.findAll({ include: [Team] });
  console.log(JSON.stringify(players, null, 2));
})();
