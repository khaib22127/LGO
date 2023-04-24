"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      "CatchLogs",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        userId: {
          onDelete: "CASCADE",
          type: Sequelize.INTEGER,
          references: { model: "Users" },
        },
        spotId: {
          onDelete: "CASCADE",
          type: Sequelize.INTEGER,
          references: { model: "Spots" },
        },
        type: {
          type: Sequelize.STRING,
        },
        weight: {
          type: Sequelize.DECIMAL,
        },
        length: {
          type: Sequelize.DECIMAL,
        },
        summary: {
          type: Sequelize.STRING
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
      },
      options
    );
  },
  down: async (queryInterface, Sequelize) => {
    options.tableName = "CatchLogs";
    return queryInterface.dropTable(options);
  },
};
