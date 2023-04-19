"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "SpotSaves";
    return queryInterface.bulkInsert(
      options,
      [
        {
          spotId: 2,
          userId: 1,
        },
        {
          spotId: 1,
          userId: 2,
        },
        {
          spotId: 3,
          userId: 3,
        },
        {
          spotId: 4,
          userId: 4,
        },
        {
          spotId: 5,
          userId: 5,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "SpotSaves";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        spotId: { [Op.in]: [1, 2, 3, 4, 5] },
      },
      {}
    );
  },
};
