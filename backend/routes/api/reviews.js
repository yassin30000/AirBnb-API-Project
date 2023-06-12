const express = require('express');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, User, SpotImage, Review, ReviewImage } = require('../../db/models');

const router = express.Router();

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
                    attributes: ['id','firstName','lastName']
                },
                {
                    model: Spot,
                    attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country','lat','lng', 'name','price','previewImage']
                },
                {
                    model: ReviewImage,
                    attributes: ['id','url']
                }
            ]
        });

        return res.json({
            Reviews: reviews
        })
    }
)

module.exports = router;