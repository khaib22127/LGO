
"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Categories";
    return queryInterface.bulkInsert(
      options,
      [
        {
          name: "Fishing",
        },
        {
          name: "Hiking",
        },
        {
          name: "Biking",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Categories";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        id: { [Op.in]: [1, 2, 3] },
      },
      {}
    );
  },
};
