'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Spot extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {

            // Spots belongs to User
            Spot.belongsTo(
                models.User,
                { foreignKey: 'ownerId', as: "Owner" }
            );

            // Spots has many reviews
            Spot.hasMany(
                models.Review,
                { foreignKey: 'spotId', onDelete: 'CASCADE', hooks: true }
            );

            // each spot has many spotImages
            Spot.hasMany(
                models.SpotImage,
                { foreignKey: 'spotId', onDelete: 'CASCADE', hooks: true }
            );

            // each spot has many bookings
            Spot.hasMany(
                models.Booking,
                { foreignKey: 'spotId', onDelete: 'CASCADE', hooks: true }
            );
        }
    }
    Spot.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        ownerId: {
            type: DataTypes.INTEGER,
            unique: false,
            references: {
                model: 'User',
                key: 'id'
            }
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false
        },
        country: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lat: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        lng: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                max: 50
            }
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        avgRating: DataTypes.DECIMAL,
        previewImage: DataTypes.STRING
    }, {
        sequelize,
        modelName: "Spot",
    });
    return Spot;
};
