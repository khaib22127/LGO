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
          categoryId: 1,
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
          categoryId: 1,
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
          categoryId: 1,
          name: "Missy River",
          address: "1670 East Mississippi Ave",
          city: "Aurora",
          state: "Maine",
          country: "United States of America",
          description: "This river is great for fishing Catfish.",
        },
        {
          userId: 4,
          categoryId: 1,
          name: "Kelly Pond",
          address: "1000 Dawnadele Ave",
          city: "Baton Rouge",
          state: "Lousiana",
          country: "United States of America",
          description: "This pond get stock with rainbow trout every 2 months!",
        },
        {
          userId: 5,
          categoryId: 1,
          name: "Terry Lake",
          address: "222 Brighton Blvd",
          city: "Castle Rock",
          state: "Michigan",
          country: "United States of America",
          description: "Load with all kind of fishes",
        },
        {
          userId: 1,
          categoryId: 1,
          name: "Denver Lake",
          address: "1212 Denver Blvd",
          city: "Denver",
          state: "Colorado",
          country: "United States of America",
          description: "Can fish here all year long",
        },
        {
          userId: 2,
          categoryId: 1,
          name: "Quincy Lake",
          address: "2323 Quincy Blvd",
          city: "Lakeview",
          state: "Florida",
          country: "United States of America",
          description: "They even have crawdad here",
        },
        {
          userId: 1,
          categoryId: 1,
          name: "Aurora Lake",
          address: "717 Aurora Blvd",
          city: "Littleton",
          state: "Kansas",
          country: "United States of America",
          description:
            "Load with all kind of fishes. Come try and see what you can catch",
        },
        {
          userId: 2,
          categoryId: 1,
          name: "Highland River",
          address: "1101 Aurora Blvd",
          city: "Smallville",
          state: "Kansas",
          country: "United States of America",
          description: "Pet friendly. Picnic area. Boat rental",
        },
        {
          userId: 2,
          categoryId: 2,
          name: "Land End Trail",
          address: "22122 Trail Blvd",
          city: "Milpitas",
          state: "California",
          country: "United States of America",
          description:
            "Dogs allowed on-leash or within sight/voice control. The difficulty is moderate and the length is 1.7 miles",
        },
        {
          userId: 2,
          categoryId: 2,
          name: "Redwood Regional Park",
          address: "28490 Skyline Blvd",
          city: "San Francisco",
          state: "California",
          country: "United States of America",
          description:
            "This 1,833-acre park in the Oakland hills boasts 150-foot coast redwoods planted to replace those logged during the Gold Rush to build the Bay Area's structures. The difficulty is Moderate with steep sections and the length is approximately 4 miles",
        },
        {
          userId: 2,
          categoryId: 3,
          name: "South Central",
          address: "1342 South Central Blvd",
          city: "Denver",
          state: "Colorado",
          country: "United States of America",
          description:
            "The city has multiple bike parks, 196 miles of on-street bike lanes connecting commuters and cyclists with all parts of Denver, from downtown to the Cherry Creek Reservoir.",
        },
        {
          userId: 2,
          categoryId: 3,
          name: "North Creek",
          address: "2222 North Creek Blvd",
          city: "San Francisco",
          state: "California",
          country: "United States of America",
          description:
            "The trail is close to parks and lakes and has easy access from roads and ramps throughout San Francisco, so you can easily plan where you'll get on or off the path for a picnic to enjoy the sites or take on other adventures.",
        },
        {
          userId: 2,
          categoryId: 3,
          name: "Bear Creek Trail",
          address: "2256 Bear Creek Blvd",
          city: "San Francisco",
          state: "California",
          country: "United States of America",
          description: "The trail is easy and fun all all ages. Pet friendly. Picnic area.",
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
