module.exports = (sequelize, DataTypes) => {
  const Topic = sequelize.define("topic", {
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
        model: "user",
        key: "id",
      },
    },
  });

  Topic.associate = function (models) {
    // Relationship with User
    Topic.belongsTo(models.user, {
      foreignKey: "userId",
      as: "user",
    });

    // Relationship with Resource
    Topic.hasMany(models.resource, {
      foreignKey: "topicId",
      as: "resources",
    });

    // Relationship with User through UserTopic
    Topic.belongsToMany(models.user, {
      through: models.userTopic,
      foreignKey: "topicId",
      as: "usersInterested",
    });
  };

  return Topic;
};
