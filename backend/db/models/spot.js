"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    static associate(models) {
      Spot.belongsTo(models.User, { foreignKey: "userId" });
      Spot.hasMany(models.Review, { foreignKey: "spotId" });
      Spot.hasMany(models.SpotImage, { foreignKey: "spotId" });
      Spot.hasMany(models.SpotSave, { foreignKey: "spotId" });
      Spot.belongsTo(models.Category, { foreignKey: "categoryId" });
    }
  }
  Spot.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "User",
        },
      },
      categoryId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Category",
        },
      },
      name: {
        type: DataTypes.STRING,
      },
      address: {
        type: DataTypes.STRING,
      },
      city: {
        type: DataTypes.STRING,
      },
      state: {
        type: DataTypes.STRING,
      },
      country: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Spot",
    }
  );
  return Spot;
};
