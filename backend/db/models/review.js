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
        },
        userId: DataTypes.INTEGER,
        spotId: DataTypes.INTEGER,
        review: DataTypes.STRING,
        stars: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Review',
    });
    return Review;
};
