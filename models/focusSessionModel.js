module.exports = (sequelize, DataTypes) => {
  const FocusSession = sequelize.define("focusSessions", {
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
    learned: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    toLearn: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  });

  FocusSession.associate = function (models) {
    // Relationship with User
    FocusSession.belongsTo(models.user, {
      foreignKey: "userId",
      as: "user",
    });

    // Relationship with Topic
    FocusSession.belongsTo(models.topic, {
      foreignKey: "topicId",
      as: "topic",
    });
  };

  return FocusSession;
};
