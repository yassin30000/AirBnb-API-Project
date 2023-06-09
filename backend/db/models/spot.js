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
                { foreignKey: 'ownerId' }
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
        id: DataTypes.INTEGER,
        userId: DataTypes.INTEGER,
        address: DataTypes.STRING,
        city: DataTypes.STRING,
        state: DataTypes.STRING,
        country: DataTypes.STRING,
        lat: DataTypes.DECIMAL,
        lng: DataTypes.DECIMAL,
        name: DataTypes.STRING,
        price: DataTypes.DECIMAL,
        avgRating: DataTypes.DECIMAL,
        previewImage: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Spot',
    });
    return Spot;
};
