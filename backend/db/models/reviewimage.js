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
                models.reviewId,
                { foreignKey: "reviewId" }
            )
        }
    }
    ReviewImage.init({
        id: DataTypes.INTEGER,
        reviewId: DataTypes.INTEGER,
        url: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'ReviewImage',
    });
    return ReviewImage;
};
