module.exports = (sequelize, DataTypes) => {
  const Resource = sequelize.define("resources", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true,
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

  Resource.associate = function (models) {
    // Relationship with Topic
    Resource.belongsTo(models.topics, {
      foreignKey: "topicId",
      as: "topic",
    });
  };

  // sequelize.getQueryInterface().removeColumn("resources", "name");

  return Resource;
};
