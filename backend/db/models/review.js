'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Review extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {

            // many reviews belong to spot
            Review.belongsTo(
                models.Spot,
                { foreignKey: "spotId" }
            );

            // many reviews belong to one user
            Review.belongsTo(
                models.User,
                { foreignKey: "userId" }
            );

            // one review has many reviewImages
            Review.hasMany(
                models.ReviewImage,
                { foreignKey: "reviewId" }
            );
        }
    }
    Review.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'User',
                key: 'id'
            }
        },
        spotId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Spot',
                key: 'id'
            }
        },
        review: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        stars: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 5
            }
        }
    }, {
        sequelize,
        modelName: 'Review',
    });
    return Review;
};
