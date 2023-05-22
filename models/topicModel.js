module.exports = (sequelize, DataTypes) => {
  const Topic = sequelize.define("topics", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
  });

  Topic.associate = function (models) {
    // Relationship with User
    Topic.belongsTo(models.users, {
      foreignKey: "userId",
      as: "user",
    });

    // Relationship with Resource
    Topic.hasMany(models.resources, {
      foreignKey: "topicId",
      as: "resources",
    });

    // Relationship with Comment
    Topic.hasMany(models.comments, {
      foreignKey: "topicId",
      as: "comments",
    });

    // Relationship with User through UserTopic
    Topic.belongsToMany(models.users, {
      through: models.userTopic,
      foreignKey: "topicId",
      as: "usersInterested",
    });
  };

  return Topic;
};
