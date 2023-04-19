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
        // {
        //   spotId: 1,
        //   url: "https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aG9tZSUyMGludGVyaW9yfGVufDB8fDB8fA%3D%3D&w=1000&q=80",
        //   preview: true,
        // },
        // {
        //   spotId: 1,
        //   url: "https://i0.wp.com/chronos-stores.com/wp-content/uploads/2022/05/how-to-use-statement-pieces-within-your-space-4-scaled.jpg?fit=2560%2C1709&ssl=1",
        //   preview: true,
        // },
        // {
        //   spotId: 1,
        //   url: "https://media.istockphoto.com/id/1249281377/photo/galley-between-family-room-and-kitchen.jpg?s=612x612&w=0&k=20&c=MaLTbXaYKnDkOWdVZT4MJs9ArMt16NoXK9TnpYK1OAc=",
        //   preview: true,
        // },
        // {
        //   spotId: 1,
        //   url: "https://www.gannett-cdn.com/presto/2021/11/22/PNDN/8dd683d3-92e5-4330-ae96-446fac710154-4th_Ave_Great_Room_1128.jpg?width=660&height=440&fit=crop&format=pjpg&auto=webp",
        //   preview: true,
        // },
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
