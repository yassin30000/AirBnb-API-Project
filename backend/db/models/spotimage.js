'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class SpotImage extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {

            // mant spotimages have one spot
            SpotImage.belongsTo(
                models.Spot,
                { foreignKey: "spotId" }
            )
        }
    }
    SpotImage.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        spotId: DataTypes.INTEGER,
        url: DataTypes.STRING,
        preview: DataTypes.BOOLEAN
    }, {
        sequelize,
        modelName: 'SpotImage',
    });
    return SpotImage;
};