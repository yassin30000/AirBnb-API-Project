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
                { foreignKey: 'spotId' }
            )
        }
    }
    SpotImage.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        spotId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Spots',
                key: 'id'
            }
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        preview: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'SpotImage',
    });
    return SpotImage;
};
