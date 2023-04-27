"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class SpotSave extends Model {
    static associate(models) {
      SpotSave.belongsTo(models.User, { foreignKey: "userId" });
      SpotSave.belongsTo(models.Spot, { foreignKey: "spotId" });
    }
  }
  SpotSave.init(
    {
      spotId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Spot",
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "User",
        },
      },
    },
    {
      sequelize,
      modelName: "SpotSave",
    }
  );
  return SpotSave;
};
