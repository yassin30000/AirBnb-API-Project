'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
    options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
    up: async (queryInterface, Sequelize) => {
        options.tableName = 'Users';
        return queryInterface.bulkInsert(options, [
            {
                id: 1,
                email: 'demo@user.io',
                firstName: 'John',
                lastName: 'Smith',
                username: 'Demo-lition',
                hashedPassword: bcrypt.hashSync('password')
            },
            {
                id: 2,
                email: 'user1@user.io',
                firstName: 'Jane',
                lastName: 'Doe',
                username: 'FakeUser1',
                hashedPassword: bcrypt.hashSync('password2')
            },
            {
                id: 3,
                email: 'user2@user.io',
                firstName: 'Demo',
                lastName: 'User',
                username: 'FakeUser2',
                hashedPassword: bcrypt.hashSync('password3')
            }
        ], {});
    },

    down: async (queryInterface, Sequelize) => {
        options.tableName = 'Users';
        const Op = Sequelize.Op;
        return queryInterface.bulkDelete(options, {
            username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
        }, {});
    }
};
