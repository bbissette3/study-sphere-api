const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("users", {
    // constructor
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        const hash = bcrypt.hashSync(value, saltRounds);
        this.setDataValue("password", hash);
      },
    },
  });

  User.associate = function (models) {
    User.hasMany(models.topics, {
      foreignKey: "userId",
      as: "topics",
      onDelete: "CASCADE",
    });

    User.hasMany(models.comments, {
      foreignKey: "userId",
      as: "comments",
      onDelete: "CASCADE",
    });

    User.hasMany(models.focusSessions, {
      foreignKey: "userId",
      as: "focusSessions",
      onDelete: "CASCADE",
    });

    User.hasMany(models.userTopics, {
      foreignKey: "userId",
      as: "userTopic",
      onDelete: "CASCADE",
    });
  };

  //instance methods
  User.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };

  return User;
};
