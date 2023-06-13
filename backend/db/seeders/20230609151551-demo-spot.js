'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
    options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */


module.exports = {
    up: async (queryInterface, Sequelize) => {
        options.tableName = 'Spots';
        return queryInterface.bulkInsert(options, [
            {
                id: 1,
                address: "1414 Hello Ln",
                ownerId: 1,
                city: "Walnut Creek",
                state: "California",
                country: "United States",
                lat: 37.7645358,
                lng: -122.4730327,
                name: "demoSpot1",
                description: "spot for a npc to live",
                price: 123
            },
            {
                id: 2,
                address: "1355 Becnia Ave",
                ownerId: 2,
                city: "Benicia",
                state: "California",
                country: "United States",
                lat: 122.7645358,
                lng: -15.4730327,
                name: "demoSpot2",
                description: "spot for a npc to live",
                price: 123
            },
            {
                id: 3,
                address: "1212 Reno Rd",
                ownerId: 3,
                city: "Reno",
                state: "Nevada",
                country: "United States",
                lat: 42.7645358,
                lng: 122.4730327,
                name: "demoSpot3",
                description: "spot for a npc to live",
                price: 123
            }
        ], {});
    },

    down: async (queryInterface, Sequelize) => {
        options.tableName = 'Spots';
        const Op = Sequelize.Op;
        return queryInterface.bulkDelete(options, {
            name: { [Op.in]: ['demoSpot1', 'demoSpot2', 'demoSpot3'] }
        }, {});
    }
};
