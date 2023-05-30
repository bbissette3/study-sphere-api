require("dotenv").config();

const { pool } = require("../config/dbConfig");

const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  pool.options.database,
  pool.options.user,
  pool.options.password,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",

    pool: {
      max: pool.options.max,
      min: pool.options.min,
      idleTimeoutMillis: pool.options.idleTimeoutMillis,
      connectionTimeoutMillis: pool.options.connectionTimeoutMillis,
    },
  }
);

const db = {};

//need to set property of sequelize library, and the instance created above
db.Sequelize = Sequelize;
db.sequelize = sequelize;

//create property for each model
db.users = require("./userModel.js")(sequelize, DataTypes);
db.topics = require("./topicModel.js")(sequelize, DataTypes);
db.comments = require("./commentModel.js")(sequelize, DataTypes);
db.focusSessions = require("./focusSessionModel.js")(sequelize, DataTypes);
db.userTopics = require("./userTopicModel.js")(sequelize, DataTypes);
db.resources = require("./resourceModel.js")(sequelize, DataTypes);

//loads the associated resources
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    try {
      db[modelName].associate(db);
    } catch (error) {
      console.error("failure");
      console.error(`Error on model ${modelName}:`, error);
    }
  }
});

//setting force to true, will cause loss of db data
db.sequelize
  .sync({ force: false }) //force break
  .then(() => {
    console.log("resync complete");
  })
  .catch((error) => {
    console.error("Error syncing the database:", error);
  });

const test = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

test();

module.exports = db;
