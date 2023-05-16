module.exports = (sequelize, DataTypes) => {
  const UserTopic = sequelize.define("userTopic", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
    },
    topicId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "topic",
        key: "id",
      },
    },
  });

  UserTopic.associate = function (models) {
    // Relationship with User
    UserTopic.belongsTo(models.user, {
      foreignKey: "userId",
      as: "user",
    });

    // Relationship with Topic
    UserTopic.belongsTo(models.topic, {
      foreignKey: "topicId",
      as: "topic",
    });
  };

  return UserTopic;
};
