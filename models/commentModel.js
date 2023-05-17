module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define("comments", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
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

  Comment.associate = function (models) {
    // Relationship with User
    Comment.belongsTo(models.user, {
      foreignKey: "userId",
      as: "user",
    });

    // Relationship with Topic
    Comment.belongsTo(models.topic, {
      foreignKey: "topicId",
      as: "topic",
    });
  };

  return Comment;
};
