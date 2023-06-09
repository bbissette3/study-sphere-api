module.exports = (sequelize, DataTypes) => {
  const UserTopic = sequelize.define("userTopics", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    topicId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "topics",
        key: "id",
      },
    },
  });

  UserTopic.associate = function (models) {
    // Relationship with User
    UserTopic.belongsTo(models.users, {
      foreignKey: "userId",
      as: "user",
      onDelete: "CASCADE",
    });

    // Relationship with Topic
    UserTopic.belongsTo(models.topics, {
      foreignKey: "topicId",
      as: "topic",
    });
  };

  return UserTopic;
};
