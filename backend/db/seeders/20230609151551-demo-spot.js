'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
    options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */

import { Spot } from ('../models/')


module.exports = {
    up: async (queryInterface, Sequelize) => {
        options.tableName = 'Spots';
        return queryInterface.bulkInsert(options, [
            {
                address: "1414 Hello Ln",
                ownerId: 1,
                city: "Walnut Creek",
                state: "CA",
                country: "United States",
                lat: 37.7645358,
                lng: -122.4730327,
                name: "demoSpot1",
                description: "paldsas",
                price: 1344
            }
        ], {});
    },

    down: async (queryInterface, Sequelize) => {
        options.tableName = 'Spots';
        const Op = Sequelize.Op;
        return queryInterface.bulkDelete(options, {
            name: { [Op.in]: ['demoSpot1'] }
        }, {});
    }
};
