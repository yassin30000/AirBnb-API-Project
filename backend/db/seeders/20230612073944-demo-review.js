'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
    options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */


module.exports = {
    up: async (queryInterface, Sequelize) => {
        options.tableName = 'Reviews';
        return queryInterface.bulkInsert(options, [
            {
                id: 1,
                userId: 1,
                spotId: 1,
                review: "this was so cool",
                stars: 5
            },
            {
                id: 2,
                userId: 2,
                spotId: 2,
                review: "this was pretty nice",
                stars: 4
            },
            {
                id: 3,
                userId: 3,
                spotId: 3,
                review: "place smelled like farts",
                stars: 1
            }
        ], {});
    },

    down: async (queryInterface, Sequelize) => {
        options.tableName = 'Reviews';
        const Op = Sequelize.Op;
        return queryInterface.bulkDelete(options, {
            stars: { [Op.in]: ['1','2','3','4','5'] }
        }, {});
    }
};
