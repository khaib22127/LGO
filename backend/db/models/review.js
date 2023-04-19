"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(models) {
      Review.belongsTo(models.Spot, { foreignKey: "spotId" });
      Review.belongsTo(models.User, { foreignKey: "userId" });
      // Review.belongsTo(models.SpotImage, { through: models.Spot, foreignKey: 'spotId' })
    }
  }
  Review.init(
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
      review: {
        type: DataTypes.STRING,
      },
      stars: {
        type: DataTypes.INTEGER,
        validate: {
          min: 1,
          max: 5,
          isInt: true,
        },
      },
    },
    {
      sequelize,
      modelName: "Review",
      scopes: {
        currentSpotReview: {
          attributes: {},
        },
      },
    }
  );
  return Review;
};
