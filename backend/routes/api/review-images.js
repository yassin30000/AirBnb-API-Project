const express = require('express');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, User, SpotImage, Review, ReviewImage } = require('../../db/models');

const router = express.Router();

// delete a reviewImage
router.delete(
    '/:imageId',
    requireAuth,
    async (req, res) => {
        const { imageId } = req.params;
        const reviewImage = await ReviewImage.findByPk(imageId);
        const { user } = req;

        // cant find reviewImage
        if (!reviewImage) {
            res.statusCode = 404;
            return res.json({ message: "Spot Image couldn't be found" })
        }

        const review = await Review.findByPk(reviewImage.reviewId);

        // Review must be owned by current user
        if (review.userId !== user.id) {
            res.statusCode = 401;
            return res.json({ message: "forbidden" })
        }

        reviewImage.destroy();
        return res.json({ message: "Successfully deleted" })
    })


module.exports = router;
