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
          url: "https://w.forfun.com/fetch/60/60bbcf7e27c829e5d5d3bf8d1041a312.jpeg",
        },
        {
          spotId: 2,
          url: "https://thecitylane.com/wp-content/uploads/2015/03/DSCF1871.jpg",
        },
        {
          spotId: 3,
          url: "https://4kwallpapers.com/images/wallpapers/autumn-trees-lake-mountain-range-day-time-landscape-long-4480x2520-4920.jpg",
        },
        {
          spotId: 4,
          url: "https://www.iamcountryside.com/wp-content/uploads/2019/03/GettyImages-612232116.jpg",
        },
        {
          spotId: 5,
          url: "https://images.pexels.com/photos/346529/pexels-photo-346529.jpeg?cs=srgb&dl=pexels-bri-schneiter-346529.jpg&fm=jpg",
        },
        {
          spotId: 6,
          url: "https://fishmasters.com/wp-content/uploads/2022/05/minnesota-fishing-lake.jpg",
        },
        {
          spotId: 7,
          url: "https://images.pexels.com/photos/247600/pexels-photo-247600.jpeg?cs=srgb&dl=pexels-pixabay-247600.jpg&fm=jpg",
        },
        {
          spotId: 8,
          url: "https://www.nalms.org/wp-content/uploads/2016/05/22797560873_d715f0899f_o.jpg",
        },
        {
          spotId: 9,
          url: "https://www.sciencenews.org/wp-content/uploads/2022/10/101722_jc_river-heat-waves_feat.jpg",
        },
        {
          spotId: 10,
          url: "https://media.timeout.com/images/105898986/image.jpg",
        },
        {
          spotId: 11,
          url: "https://upload.travelawaits.com/ta/uploads/2022/07/Muir-Main-Trail-1024x683.jpg",
        },
        {
          spotId: 12,
          url: "https://www.skijournal.com/wp-content/uploads/sites/8/2022/06/bikingMM.jpg",
        },
        {
          spotId: 13,
          url: "https://static.wixstatic.com/media/ce2dd7_d004fd8287ff4baf8a0237a28bea551b~mv2.png/v1/fill/w_1000,h_561,al_c,q_90,usm_0.66_1.00_0.01/ce2dd7_d004fd8287ff4baf8a0237a28bea551b~mv2.png",
        },
        {
          spotId: 14,
          url: "https://i0.wp.com/electrek.co/wp-content/uploads/sites/3/2019/05/rungu-header.jpg",
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
        spotId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8] },
      },
      {}
    );
  },
};
