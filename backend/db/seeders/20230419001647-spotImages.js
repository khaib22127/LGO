"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "SpotImages";
    return queryInterface.bulkInsert(
      options,
      [
        {
          spotId: 1,
          url: "https://wiselivingmagazine.co.uk/wp-content/uploads/2020/01/Most-beautiful-Lakes-Lake-tahoe.jpg",
        },
        {
          spotId: 2,
          url: "https://thecitylane.com/wp-content/uploads/2015/03/DSCF1871.jpg",
        },
        {
          spotId: 3,
          url: "https://cdn-dagmd.nitrocdn.com/GkSQqzOLaEezXjOFCgVFfMwImNJoCLDL/assets/images/optimized/rev-6c46e46/20210913150333/jkamero-Instagram-2465-ig-17906171063111602-1024x1024.jpg",
        },
        {
          spotId: 4,
          url: "https://www.iamcountryside.com/wp-content/uploads/2019/03/GettyImages-612232116.jpg",
        },
        {
          spotId: 5,
          url: "https://i.insider.com/5a25b75b3339b038008b45e0?width=750&format=jpeg&auto=webp",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "SpotImages";
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
