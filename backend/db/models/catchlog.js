"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class CatchLog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CatchLog.belongsTo(models.Spot, { foreignKey: "spotId" });
      CatchLog.belongsTo(models.User, { foreignKey: "userId" });
    }
  }
  CatchLog.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "User",
        },
      },
      spotId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Spot",
        },
      },
      type: {
        type: DataTypes.STRING,
      },
      weight: {
        type: DataTypes.DECIMAL,
      },
      length: {
        type: DataTypes.DECIMAL,
      },
      summary: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "CatchLog",
    }
  );
  return CatchLog;
};
