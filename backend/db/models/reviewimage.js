'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ReviewImage extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {

            // many reviewImages have one review
            ReviewImage.belongsTo(
                models.Review,
                { foreignKey: "reviewId" }
            )
        }
    }
    ReviewImage.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        reviewId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Reviews',
                key: 'id'
            }
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    }, {
        sequelize,
        modelName: "ReviewImage",
    });
    return ReviewImage;
};
