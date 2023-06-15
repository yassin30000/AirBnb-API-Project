const express = require('express');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, User, SpotImage, Review, ReviewImage } = require('../../db/models');

const router = express.Router();

const validateReview = [
    check('review')
        .exists({ checkFalsy: true })
        .withMessage('Review text is required'),
    check('review')
        .isString()
        .withMessage('Review must be a string'),
    check('stars')
        .exists({ checkFalsy: true })
        .withMessage('Stars are required'),
    check('stars')
        .isInt({ min: 1, max: 5 })
        .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
]

// get all reviews of the current user
router.get(
    '/current',
    requireAuth,
    async (req, res) => {

        const { user } = req;
        const reviews = await Review.findAll({
            where: {
                userId: user.id
            },
            include: [
                {
                    model: User,
                    attributes: ['id', 'firstName', 'lastName']
                },
                {
                    model: Spot,
                    attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price', 'previewImage']
                },
                {
                    model: ReviewImage,
                    attributes: ['id', 'url']
                }
            ]
        });

        return res.json({
            Reviews: reviews
        })
    }
);

// Add an Image to a Review based on the Review's id
router.post(
    '/:reviewId/images',
    requireAuth,
    async (req, res) => {
        const { user } = req;
        let { reviewId } = req.params;
        reviewId = Number(reviewId);
        const review = await Review.findByPk(reviewId);

        // review cant be found
        if (!review) {
            res.statusCode = 404;
            return res.json({ "message": "Review couldn't be found" })
        }

        // review must belong to curr user
        if (review.userId !== user.id) {
            res.status = 403;
            return res.json({ "message": "Forbidden" })
        }

        // if max is reached
        const allReviewImages = await ReviewImage.findAll({
            where: {
                reviewId: reviewId
            }
        })

        if (allReviewImages.length > 10) {
            res.statusCode = 403;
            return res.json({ "message": "Maximum number of images for this resource was reached" })
        }

        const { url } = req.body;
        const reviewImage = await ReviewImage.create({ url, reviewId });

        return res.json({
            id: reviewImage.id,
            url: reviewImage.url
        })
    }
);

// edit a review
router.put(
    '/:reviewId',
    requireAuth,
    validateReview,
    async (req, res) => {
        const { user } = req;
        let { reviewId } = req.params;
        reviewId = Number(reviewId);
        const currReview = await Review.findByPk(reviewId);

        // cant find review from reviewId
        if (!currReview) {
            res.statusCode = 404;
            res.json({ "message": "Review couldn't be found" })
        }

        // review must belong to curr user
        if (currReview.userId !== user.id) {
            res.status = 403;
            return res.json({ "message": "Forbidden" })
        }

        const { review, stars } = req.body;
        currReview.review = review;
        currReview.stars = Number(stars);

        currReview.update({ review, stars })
        currReview.save();

        return res.json({
            id: currReview.id,
            userId: user.id,
            spotId: currReview.spotId,
            review: currReview.review,
            stars: currReview.stars,
            createdAt: currReview.createdAt,
            updatedAt: currReview.updatedAt
        })
    }
);

// delete a review
router.delete(
    '/:reviewId',
    requireAuth,
    async (req, res) => {
        let { reviewId } = req.params;
        reviewId = Number(reviewId);
        const { user } = req;
        const review = await Review.findByPk(reviewId);

        // review couldnt be found
        if (!review) {
            res.statusCode = 404;
            return res.json({ message: "Review couldn't be found"})
        }

        // review must be owned by user
        if (review.userId !== user.id) {
            res.statusCode = 401;
            return res.json({ message: "forbidden" });
        }

        await review.destroy();
        return res.json({ message: "Successfully deleted"})
    }
)

module.exports = router;
