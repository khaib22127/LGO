"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Reviews";
    return queryInterface.bulkInsert(
      options,
      [
        {
          userId: 1,
          spotId: 2,
          review:
            "If you are new to fishing it's a great place to start ,they have bait / rod and reel rentals and lots of people always...",
          stars: 5,
        },
        {
          userId: 1,
          spotId: 3,
          review:
            "I bought my family here for a fishing day and the kids loved it!",
          stars: 4,
        },
        {
          userId: 1,
          spotId: 4,
          review:
            "Great place to fish and we had a lot of fun, worth checking it out if you like to fish but get there early to get a good spot. ",
          stars: 5,
        },
        {
          userId: 2,
          spotId: 1,
          review: "This place was so beautiful and great for kids.",
          stars: 5,
        },
        {
          userId: 2,
          spotId: 3,
          review:
            "Even though we had no luck fishing today, but the weather still nice and this place is gorgeous.",
          stars: 5,
        },
        {
          userId: 3,
          spotId: 1,
          review:
            "Catch believe I didn't find this place sooner. I can't wait to go back next week",
          stars: 4,
        },
        {
          userId: 3,
          spotId: 4,
          review:
            "If you are new to fishing it's a great place to start ,they have bait / rod and reel rentals and lots of people always...",
          stars: 5,
        },
        {
          userId: 4,
          spotId: 1,
          review:
            "Fishing is not an escape from life, but often a deeper immersion into it.",
          stars: 5,
        },
        {
          userId: 4,
          spotId: 6,
          review: "Fishing here is the best!",
          stars: 5,
        },
        {
          userId: 4,
          spotId: 7,
          review: "Can not wait to bring my daughter here!",
          stars: 5,
        },
        {
          userId: 4,
          spotId: 8,
          review: "Fishing is is the best here!",
          stars: 5,
        },
        {
          userId: 4,
          spotId: 9,
          review:
            "The best spot to enjoy with friends and families",
          stars: 5,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Reviews";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        spotId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
      },
      {}
    );
  },
};
