"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "CatchLogs";
    return queryInterface.bulkInsert(
      options,
      [
        {
          userId: 1,
          spotId: 1,
          type: "Large mouth bass",
          weight: 2.5,
          length: 10,
          summary: "This bass really put up a good fight!",
        },
        {
          userId: 1,
          spotId: 2,
          type: "Bluegill",
          weight: 0.2,
          length: 5,
          summary: "They bite instantly, was really fun catching them!",
        },
        {
          userId: 2,
          spotId: 1,
          type: "Catfish",
          weight: 12.5,
          length: 20,
          summary: "Catfish are fun to reel in and they are strong!",
        },
        {
          userId: 2,
          spotId: 3,
          type: "Alligator gar",
          weight: 34,
          length: 48,
          summary: "This fish is a monster!",
        },
        {
          userId: 2,
          spotId: 4,
          type: "Yellow Perch",
          weight: 8,
          length: 19,
          summary: "Come by while they still around the area!",
        },
        {
          userId: 3,
          spotId: 1,
          type: "Thunder Trout",
          weight: 17,
          length: 10,
          summary: "I use power bait, and it work like magic",
        },
        {
          userId: 3,
          spotId: 2,
          type: "Pike",
          weight: 15.5,
          length: 14,
          summary: "Couldn't ask for a better fight from these fish!",
        },
        {
          userId: 2,
          spotId: 4,
          type: "Alligator gar",
          weight: 34,
          length: 48,
          summary: "This fish is a monster!",
        },
        {
          userId: 4,
          spotId: 1,
          type: "Thunder Trout",
          weight: 17,
          length: 10,
          summary: "I use power bait, and it work like magic",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "CatchLogs";
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
