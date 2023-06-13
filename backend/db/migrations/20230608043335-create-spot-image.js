'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
    options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('SpotImages', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            spotId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Spots',
                    key: 'id'
                }
            },
            url: {
                type: Sequelize.STRING,
                allowNull: false
            },
            preview: {
                type: Sequelize.BOOLEAN,
                allowNull: false
            },
            createdAt: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            },
            updatedAt: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            }
        }, options);
    },
    async down(queryInterface, Sequelize) {
        options.tableName = "SpotImages";
        return queryInterface.dropTable(options);
    }
};
