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
                city: "Malibu",
                state: "California",
                country: "United States",
                lat: 37.7645358,
                lng: -122.4730327,
                name: "Escondido Beach",
                description: "Escon",
                price: 3103
            },
            {
                id: 2,
                address: "1355 Becnia Ave",
                ownerId: 2,
                city: "Malibu",
                state: "California",
                country: "United States",
                lat: 122.7645358,
                lng: -15.4730327,
                name: "Malibu Beach",
                description: "spot for a npc to live",
                price: 8250
            },
            {
                id: 3,
                address: "1212 Reno Rd",
                ownerId: 3,
                city: "Newport Beach",
                state: "California",
                country: "United States",
                lat: 42.7645358,
                lng: 122.4730327,
                name: "Newport Beach",
                description: "spot for a npc to live",
                price: 1275
            },
            {
                id: 4,
                address: "1212 Reno Rd",
                ownerId: 3,
                city: "Oxnard",
                state: "California",
                country: "United States",
                lat: 42.7645358,
                lng: 122.4730327,
                name: "Oxnard State Beach Park",
                description: "spot for a npc to live",
                price: 1275
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
