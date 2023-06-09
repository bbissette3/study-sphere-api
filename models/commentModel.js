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
    Comment.belongsTo(models.users, {
      foreignKey: "userId",
      as: "user",
      onDelete: "CASCADE",
    });

    // Relationship with Topic
    Comment.belongsTo(models.topics, {
      foreignKey: "topicId",
      as: "topic",
    });
  };

  return Comment;
};
