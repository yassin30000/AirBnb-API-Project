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
                id: 1,
                spotId: 1,
                url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-645949816519904365/original/077e14bb-3c59-4436-ac54-24dcb2d5f00d.jpeg?im_w=1200',
                preview: true
            },
            {
                id: 2,
                spotId: 2,
                url: 'https://a0.muscache.com/im/pictures/miso/Hosting-29417765/original/a3367097-60c3-4518-a568-248f67f13c70.jpeg?im_w=720',
                preview: true
            },
            {
                id: 3,
                spotId: 3,
                url: 'https://a0.muscache.com/im/pictures/e99f4706-2c4e-4690-a7da-d6ad5184c50f.jpg?im_w=720',
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
