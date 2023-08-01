const express = require('express');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, User, SpotImage, Review, ReviewImage, Booking, Sequelize } = require('../../db/models');
const { Op } = require('sequelize');
const sequelize = require('sequelize')
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

const validateQuery = [
    check("page")
        .optional(true)
        .isFloat({ min: 1 })
        .withMessage("Page must be greater than or equal to 1"),
    check("size")
        .optional(true)
        .isFloat({ min: 1 })
        .withMessage("Size must be greater than or equal to 1"),
    check("maxLng")
        .optional(true)
        .isFloat({ max: 180 })
        .withMessage("Maximum longitude is invalid"),
    check("minLng")
        .optional(true)
        .isFloat({ min: -180 })
        .withMessage("Minumum longitude is invalid"),
    check("maxLat")
        .optional(true)
        .isFloat({ max: 90 })
        .withMessage("Maximum latitude is invalid"),
    check("minLat")
        .optional(true)
        .isFloat({ min: -90 })
        .withMessage("Minumum latitude is invalid"),
    check("maxPrice")
        .optional(true)
        .isFloat({ min: 0 })
        .withMessage("Maximum price must be greater than or equal to 0"),
    check("minPrice")
        .optional(true)
        .isFloat({ min: 0 })
        .withMessage("Minimum price must be greater than or equal to 0"),
    handleValidationErrors,
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

//Get all spots
router.get(
    '/',
    validateQuery,
    async (req, res) => {
        let { page, size, minPrice, maxPrice, minLat, maxLat, minLng, maxLng } = req.query;

        if (!page) page = 1;
        if (!size) size = 20;
        if (page > 10) page = 1;
        if (size > 20) size = 20;

        page = parseInt(page);
        size = parseInt(size);

        let pagination = {
            limit: size,
            offset: size * (page - 1),
        };

        const where = {};

        if (minPrice) where.price = { [Op.gte]: minPrice };
        if (maxPrice) where.price = { ...where.price, [Op.lte]: maxPrice };
        if (maxLat) where.lat = { ...where.lat, [Op.lte]: maxLat };
        if (minLat) where.lat = { [Op.gte]: minLat };
        if (maxLng) where.lng = { ...where.lng, [Op.lte]: maxLng };
        if (minLng) where.lng = { [Op.gte]: minLng };

        const spots = await Spot.findAll({
            where,
            order: [["id", "DESC"]],
            ...pagination,
        });

        for (const spot of spots) {
            const previewImage = await SpotImage.findOne({
                attributes: ["url"],
                where: { spotId: spot.id, preview: true },
            });

            if (previewImage) spot.dataValues.previewImage = previewImage.dataValues.url;

            const spotAvgRating = await Spot.findByPk(spot.id, {
                include: [{ model: Review, attributes: [] }],
                attributes: [
                    "id", "ownerId", "address", "city", "state", "country", "lat", "lng", "name", "description", "price", "createdAt", "updatedAt",
                    [sequelize.fn("ROUND", sequelize.fn("AVG", sequelize.col("stars")), 2), "avgRating"],
                ],
                group: ["Spot.id"],
            });

            const avgRating = spotAvgRating.dataValues.avgRating;

            if (spotAvgRating) spot.dataValues.avgRating = avgRating;
        }

        return res.json({
            Spots: spots,
            page: parseInt(page),
            size: parseInt(size),
        });
    });

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

        for (const spot of spots) {
            const previewImage = await SpotImage.findOne({
                attributes: ["url"],
                where: { spotId: spot.id, preview: true },
            });

            if (previewImage) spot.dataValues.previewImage = previewImage.dataValues.url;

            const spotAvgRating = await Spot.findByPk(spot.id, {
                include: [{ model: Review, attributes: [] }],
                attributes: [
                    "id", "ownerId", "address", "city", "state", "country", "lat", "lng", "name", "description", "price", "createdAt", "updatedAt",
                    [sequelize.fn("ROUND", sequelize.fn("AVG", sequelize.col("stars")), 2), "avgRating"],
                ],
                group: ["Spot.id"],
            });

            const avgRating = spotAvgRating.dataValues.avgRating;

            if (spotAvgRating) spot.dataValues.avgRating = avgRating;
        }

        res.json({
            Spots: spots
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
            attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'description', 'price', 'createdAt', 'updatedAt']
        });

        // if spot cant be found
        if (!spot) {
            res.statusCode = 404;
            return res.json({ message: "Spot couldn't be found" })
        }

        const numOfReviews = await Review.count({ where: { spotId: spotId } })

        const spotAvgRating = await Spot.findByPk(spotId, {
            include: [{ model: Review, attributes: [] }],
            attributes: [
                "id", "ownerId", "address", "city", "state", "country", "lat", "lng", "name", "description", "price", "createdAt", "updatedAt",
                [sequelize.fn("ROUND", sequelize.fn("AVG", sequelize.col("stars")), 2), "avgRating"],
            ],
            group: ["Spot.id"],
        });

        const avgRating = spotAvgRating.dataValues.avgRating;

        if (spotAvgRating) spot.dataValues.avgRating = avgRating;

        spot.dataValues.numReviews = numOfReviews;

        return res.json(spot);
    });

// Add an Image to a Spot based on the Spot's id
router.post(
    '/:spotId/images',
    requireAuth,
    async (req, res) => {
        // spot needs to belong to current user with message: forbidden
        const { spotId } = req.params;
        const { user } = req;
        const spot = await Spot.findByPk(spotId);
        if (!spot) {
            res.statusCode = 404;
            res.json({ message: "Spot couldn't be found" })
        }
        if (spot.ownerId !== user.id) {
            res.statusCode = 401;
            return res.json({ message: "forbidden" })
        }
        else {
            const { url, preview } = req.body;
            const spotImage = await SpotImage.create({ url, spotId, preview });

            return res.json({
                id: spotImage.id,
                url: spotImage.url,
                preview: spotImage.preview
            })
        }
    });

// edit a spot
router.put(
    '/:spotId',
    requireAuth,
    validateSpot,
    async (req, res) => {
        const { spotId } = req.params;
        const { user } = req;
        const spot = await Spot.findByPk(spotId);

        // spot couldnt be found
        if (!spot) {
            res.statusCode = 404;
            return res.json({ message: "Spot couldn't be found" })
        }

        // spot needs to be owned by current user
        if (spot.ownerId !== user.id) {
            console.log('BACKEDND: OWNER ID: ', spot.ownerId)
            console.log('BACKEDND: USER ID: ', user.id)

            res.statusCode = 401;
            return res.json({ message: "forbidden" })
        }

        const { address, city, state, country, lat, lng, name, description, price } = req.body;
        spot.address = address;
        spot.city = city;
        spot.state = state;
        spot.country = country;
        spot.lat = lat;
        spot.lng = lng;
        spot.name = name;
        spot.description = description;
        spot.price = price;

        spot.update({ address, city, state, country, lat, lng, name, description, price });
        spot.save();
        return res.json({
            id: spot.id,
            ownerId: spot.ownerId,
            address: address,
            city: city,
            state: state,
            country: country,
            lat: lat,
            lng: lng,
            name: name,
            description: description,
            price: price,
            createdAt: spot.createdAt,
            updatedAt: spot.updatedAt
        })
    });

// delete a spot
router.delete(
    '/:spotId',
    requireAuth,
    async (req, res) => {
        const { spotId } = req.params;
        const { user } = req;
        const spot = await Spot.findByPk(spotId);

        // spot couldnt be found
        if (!spot) {
            res.statusCode = 404;
            return res.json({ message: "Spot couldn't be found" })
        }

        // spot needs to be owned by current user
        if (spot.ownerId !== user.id) {
            res.statusCode = 401;
            return res.json({ message: "forbidden" })
        }

        await spot.destroy();

        return res.json({ "message": "Successfully deleted" })
    }
)

// get all reviews from spotId
router.get(
    '/:spotId/reviews',
    async (req, res) => {
        const { spotId } = req.params;
        const reviews = await Review.findAll({
            where: {
                spotId: spotId
            },
            include: [
                {
                    model: User,
                    attributes: ['id', 'firstName', 'lastName']
                },
                {
                    model: ReviewImage,
                    attributes: ['id', 'url']
                }
            ]
        })
        const spot = await Spot.findByPk(spotId);

        // cant find spot by id
        if (!spot) {
            res.statusCode = 404;
            return res.json({ message: "Spot couldn't be found" })
        }

        return res.json({
            Reviews: reviews
        })
    });

// create review from spotId
router.post(
    '/:spotId/reviews',
    requireAuth,
    async (req, res) => {
        let { spotId } = req.params;
        spotId = Number(spotId)
        const { user } = req;
        const userId = user.id;
        const spot = await Spot.findByPk(spotId);

        // cant find spot by id
        if (!spot) {
            res.statusCode = 404;
            return res.json({ message: "Spot couldn't be found" })
        }

        const reviews = await Review.findAll({ where: { spotId: spot.id } });

        for (const review of reviews) {
            if (review.userId == user.id) {
                res.statusCode = 403;
                return res.json({ "message": "User already has a review for this spot" })
            }
        }

        const { review, stars } = req.body;
        const newReview = await Review.create({ review, stars, spotId, userId });

        return res.json({
            id: newReview.id,
            userId: userId,
            spotId: spotId,
            review: newReview.review,
            stars: newReview.stars,
            createdAt: newReview.createdAt,
            updatedAt: newReview.updatedAt
        })
    });

// Get all Bookings for a Spot based on the Spot's id
router.get(
    '/:spotId/bookings',
    requireAuth,
    async (req, res) => {
        let { spotId } = req.params;
        spotId = Number(spotId);
        const { user } = req;
        const spot = await Spot.findByPk(spotId);

        // cant find spot with spotId
        if (!spot) {
            res.statusCode = 404;
            res.json({ message: "Spot couldn't be found" })
        }

        // if you ARE NOT the owner of the spot
        if (spot.ownerId !== user.id) {
            const bookings = await Booking.findAll({
                where: { spotId: spotId },
                attributes: ['spotId', 'startDate', 'endDate']
            });
            return res.json({ Bookings: bookings })
        } else {
            // you ARE the owner
            const bookings = await Booking.findAll({
                where: { spotId: spotId },
                attributes: ['id', 'spotId', 'userId', 'startDate', 'endDate', 'createdAt', 'updatedAt'],
                include: { model: User, attributes: ['id', 'firstName', 'lastName'] }
            });
            return res.json({ Bookings: bookings })
        }
    }
)

// create a booking from a spot based on spotId
router.post(
    '/:spotId/bookings',
    requireAuth,
    async (req, res) => {
        let { spotId } = req.params;
        spotId = Number(spotId)

        const { user } = req;
        const spot = await Spot.findByPk(spotId);
        const userId = user.id
        const { startDate, endDate } = req.body;

        // spot cant be found
        if (!spot) {
            res.statusCode = 404;
            res.json({ message: "Spot coudn't be found" })
        }

        // if spot owned by current user
        if (spot.ownerId === user.id) {
            res.statusCode = 403;
            return res.json({ message: "Forbidden" })
        }

        // endDate cant be before startDate
        if (endDate <= startDate) {
            res.title = "Bad Request"
            res.statusCode = 400;
            return res.json({ message: "Bad Request", errors: { endDate: "endDate cannot be on or before startDate" } })
        }

        // booking conflict
        const bookings = await Booking.findAll({ where: { spotId: spotId } });
        for (let book of bookings) {
            const bookedStart = book.startDate;
            const bookedEnd = book.endDate;

            // startDate is same as prior booking
            if (startDate === bookedStart || startDate === bookedEnd) return startError();
            // endDate is same as prior booking
            if (endDate === bookedStart || endDate === bookedEnd) return endError();
            // if startDate is in between prior booking
            if (startDate < bookedEnd && startDate > bookedStart) return startError();
            // if endDate is in between prior booking
            if (endDate < bookedEnd && endDate > bookedStart) return endError();
            // if booking is in between start and end date
            if (startDate < bookedStart && endDate > bookedEnd) return bothError();
        }

        function startError() {
            res.statusCode = 403;
            return res.json({
                message: "Sorry, this spot is already booked for the specified dates",
                errors: {
                    startDate: "Start date conflicts with an existing booking",
                }
            })
        }
        function endError() {
            res.statusCode = 403;
            return res.json({
                message: "Sorry, this spot is already booked for the specified dates",
                errors: {
                    endDate: "End date conflicts with an existing booking"
                }
            })
        }
        function bothError() {
            res.statusCode = 403;
            return res.json({
                message: "Sorry, this spot is already booked for the specified dates",
                errors: {
                    startDate: "Start date conflicts with an existing booking",
                    endDate: "End date conflicts with an existing booking"
                }
            })
        }

        const booking = await Booking.create({ spotId, userId, startDate, endDate });

        return res.json({
            id: booking.id,
            spotId: booking.spotId,
            userId: booking.userId,
            startDate: booking.startDate,
            endDate: booking.endDate,
            createdAt: booking.createdAt,
            updatedAt: booking.updatedAt
        })
    }
);



module.exports = router;
