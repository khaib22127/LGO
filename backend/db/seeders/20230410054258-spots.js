"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Spots";
    return queryInterface.bulkInsert(
      options,
      [
        {
          userId: 1,
          name: "Sky Lake",
          address: "123 Disney Lane",
          city: "San Francisco",
          state: "California",
          country: "United States of America",
          description:
            "This lake has catfish, bass, trout, and lots of sunfish.",
        },
        {
          userId: 2,
          name: "The Big Lake",
          address: "225 Fire Lane",
          city: "San Jose",
          state: "California",
          country: "United States of America",
          description:
            "If you like fishing for catfish, bluegil, and large mouth bass, this would be a perfect place.",
        },
        {
          userId: 3,
          name: "Missy River",
          address: "1670 East Mississippi Ave",
          city: "Aurora",
          state: "Colorado",
          country: "United States of America",
          description:
            "This river is great for fishing Catfish.",
        },
        {
          userId: 4,
          name: "Kelly Pond",
          address: "1000 Dawnadele Ave",
          city: "Baton Rouge",
          state: "Lousiana",
          country: "United States of America",
          description:
            "This pond get stock with rainbow trout every 2 months!",
        },
        {
          userId: 5,
          name: "Terry Lake",
          address: "555 Brighton Blvd",
          city: "Denver",
          state: "Colorado",
          country: "United States of America",
          description: "Load with all kind of fishes",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Spots";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        userId: { [Op.in]: [1, 2, 3, 4, 5] },
      },
      {}
    );
  },
};
