'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
    options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */


module.exports = {
    up: async (queryInterface, Sequelize) => {
        options.tableName = 'Bookings';
        return queryInterface.bulkInsert(options, [
            {
                spotId: 1,
                userId: 2,
                startDate: "2021-11-19",
                endDate: "2021-11-20"
            },
            {
                spotId: 2,
                userId: 1,
                startDate: "2021-12-19",
                endDate: "2021-12-20"
            },
            {
                spotId: 3,
                userId: 1,
                startDate: "2022-1-19",
                endDate: "2022-1-20"
            }
        ], {});
    },

    down: async (queryInterface, Sequelize) => {
        options.tableName = 'Bookings';
        const Op = Sequelize.Op;
        return queryInterface.bulkDelete(options, {
            spotId: { [Op.in]: ['1'] }
        }, {});
    }
};
