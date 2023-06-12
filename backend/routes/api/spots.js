const express = require('express');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, User, SpotImage } = require('../../db/models');

const router = express.Router();

const validateSpot = [
    check('address')
        .exists({ checkFalsy: true })
        .withMessage("Street address is required"),
    check('city')
        .exists({ checkFalsy: true })
        .withMessage("City is required"),
    check('state')
        .exists({ checkFalsy: true })
        .withMessage("State is required"),
    check('country')
        .exists({ checkFalsy: true })
        .withMessage("Country is required"),
    check('lat')
        .exists({ checkFalsy: true })
        .withMessage("Latitude is not valid"),
    check('lng')
        .exists({ checkFalsy: true })
        .withMessage("Longitude is not valid"),
    check('name')
        .exists({ checkFalsy: true })
        .isLength({ min: 1, max: 50 })
        .withMessage("Name must be less than 50 characters"),
    check('description')
        .exists({ checkFalsy: true })
        .withMessage("Description is required"),
    check('price')
        .exists({ checkFalsy: true })
        .withMessage("Price per day is required"),
    handleValidationErrors
];

// create a spot
router.post(
    '/',
    requireAuth,
    validateSpot,
    async (req, res) => {
        const { address, city, state, country, lat, lng, name, description, price } = req.body;
        const ownerId = req.user.dataValues.id;
        const spot = await Spot.create({ ownerId, address, city, state, country, lat, lng, name, description, price });

        return res.json({
            spot
        })
    });


// get all spots
router.get(
    '/',
    async (req, res) => {
        const spots = await Spot.findAll();

        return res.json({
            spots: spots
        });
    }
);

// get all spots owned by current user
router.get(
    '/current',
    requireAuth,
    async (req, res) => {

        const { user } = req;
        const spots = await Spot.findAll({
            where: {
                ownerId: user.id
            }
        })

        res.json({
            spots: spots
        })

    }
);

// Get details of a Spot from an id
router.get(
    '/:spotId',
    async (req, res) => {
        const { spotId } = req.params;
        const spot = await Spot.findByPk(spotId, {
            include: [
                {
                    model: SpotImage,
                    attributes: ['id', 'url', 'preview']
                },
                {
                    model: User,
                    as: 'Owner',
                    attributes: ['id', 'firstName', 'lastName'],
                }
            ],
            attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng',
            'name','description','price','createdAt','updatedAt']
        });



        if (!spot) {
            res.statusCode = 404;
            return res.json({ message: "Spot couldn't be found" })
        }
        res.json(spot)
    }
)

module.exports = router;
