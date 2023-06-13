'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
    options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Reviews', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            userId: {
                type: Sequelize.INTEGER,
                allowNull: false
                // references: {
                //     model: 'Users',
                //     key: 'id'
                // }
            },
            spotId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Spots',
                    key: 'id'
                }
            },
            review: {
                type: Sequelize.STRING,
                allowNull: false
            },
            stars: {
                type: Sequelize.INTEGER,
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
        options.tableName = "Reviews";
        return queryInterface.dropTable(options);
    }
};
