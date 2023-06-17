const express = require('express');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, User, SpotImage, Review, ReviewImage, Booking, Sequelize } = require('../../db/models');

const router = express.Router();

const validateBooking = [
    check('startDate')
        .isDate('yyyy-mm-dd')
        .withMessage('startDate needs to be a valid date'),
    check('endDate')
        .isDate('yyyy-mm-dd')
        .withMessage('endDate needs to be a valid date'),
    handleValidationErrors
]

// get all bokings by current user
router.get(
    '/current',
    requireAuth,
    async (req, res) => {
        const { user } = req;
        const bookings = await Booking.findAll({
            where: {
                userId: user.id
            },
            include: [
                {
                    model: Spot,
                    attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price', 'previewImage',]
                }
            ]
        });

        for (const booking of bookings) {
            const spot = booking.Spot;
            const previewImage = await SpotImage.findOne({
                attributes: ['url'],
                where: { spotId: spot.id, preview: true }
            });
            if (previewImage) spot.dataValues.previewImage = previewImage.url
        }

        return res.json({
            Bookings: bookings
        })
    }
);

// create current date in "yyyy/mm/dd" format
const d = new Date();
let day = d.getDate();
if (day < 10) day = `0${day}`;
let month = d.getMonth();
if (month < 10) month = `0${month}`;
let year = d.getFullYear();
let curr = `${year}-${month}-${day}`;

// edit a booking
router.put(
    '/:bookingId',
    requireAuth,
    validateBooking,
    async (req, res) => {
        let { bookingId } = req.params;
        bookingId = Number(bookingId);
        const { user } = req;
        const { startDate, endDate } = req.body;
        const booking = await Booking.findByPk(bookingId);

        // cant find booking from bookingId
        if (!booking) {
            res.statusCode = 404;
            res.json({ message: "Booking couldn't be found" })
        }
        const spotId = booking.spotId;

        // booking must belong to current user
        if (booking.userId !== user.id) {
            res.statusCode = 403;
            return res.json({ message: "Forbidden" })
        }

        // endDate cant be before startDate
        if (endDate <= startDate) {
            res.title = "Bad Request"
            res.statusCode = 400;
            return res.json({ message: "Bad Request", errors: { endDate: "endDate cannot come before startDate" } })
        }

        // cant edit booking past the endDate
        if (booking.endDate <= curr) {
            res.statusCode = 403;
            return res.json({ message: "Past bookings can't be modified" })
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
            // if prior booking is in between start and end date
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

        // if there are no problems, edit booking
        booking.startDate = startDate;
        booking.endDate = endDate;
        booking.update({ startDate, endDate })
        booking.save();
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

// delete a booking
router.delete(
    '/:bookingId',
    requireAuth,
    async (req, res) => {
        const { bookingId } = req.params;
        const { user } = req;
        const booking = await Booking.findByPk(bookingId);

        // booking couldnt be found
        if (!booking) {
            res.statusCode = 404;
            return res.json({ message: "Booking couldn't be found" })
        }

        const spot = await Spot.findByPk(booking.spotId);

        let spotOwner, bookOwner;
        if (spot.ownerId == user.id) spotOwner = true;
        else if (booking.userId == user.id) bookOwner = true;

        if (!bookOwner && !spotOwner) {
            res.statusCode = 401;
            return res.json({ message: "forbidden" });
        }

        // bookings that have been started cant be deleted
        if (booking.startDate <= curr) {
            res.statusCode = 403;
            return res.json({ message: "Bookings that have been started can't be deleted" })
        }

        await booking.destroy();
        return res.json({ "message": "Successfully deleted" })
    }
);

module.exports = router;
