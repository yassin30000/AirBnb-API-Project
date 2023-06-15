'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
    options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        options.tableName = 'ReviewImages';
        return queryInterface.bulkInsert(options, [
            {
                id: 1,
                reviewId: 1,
                url: 'image url'
            },
            {
                id: 2,
                reviewId: 2,
                url: 'image url'
            },
            {
                id: 3,
                reviewId: 2,
                url: 'image url'
            }
        ], {});
    },

    down: async (queryInterface, Sequelize) => {
        options.tableName = 'ReviewImages';
        const Op = Sequelize.Op;
        return queryInterface.bulkDelete(options, {
            url: { [Op.in]: ['image url'] }
        }, {});
    }
};
