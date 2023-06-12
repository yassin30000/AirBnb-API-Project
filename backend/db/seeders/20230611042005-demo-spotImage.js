'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
    options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        options.tableName = 'SpotImages';
        return queryInterface.bulkInsert(options, [
            {
                spotId: 1,
                url: 'image url',
                preview: true
            },
            {
                spotId: 1,
                url: 'image url',
                preview: true
            }
        ], {});
    },

    down: async (queryInterface, Sequelize) => {
        options.tableName = 'SpotImages';
        const Op = Sequelize.Op;
        return queryInterface.bulkDelete(options, {
            url: { [Op.in]: ['image url'] }
        }, {});
    }
};
