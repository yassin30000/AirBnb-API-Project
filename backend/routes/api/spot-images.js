const express = require('express');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, User, SpotImage, Review, ReviewImage } = require('../../db/models');

const router = express.Router();

// delete a spot image
router.delete(
    '/:imageId',
    requireAuth,
    async (req, res) => {
        const { imageId } = req.params;
        const spotImage = await SpotImage.findByPk(imageId);
        const { user } = req;

        // cant find spotImage
        if (!spotImage) {
            res.statusCode = 404;
            res.json({ message: "Spot Image couldn't be found" })
        }
        
        const spot = await Spot.findByPk(spotImage.spotId);

        // spot must be owned by current user
        if (spot.ownerId !== user.id) {
            res.statusCode = 401;
            return res.json({ message: "forbidden" })
        }

        spotImage.destroy();
        res.json({ message: "Successfully deleted"})
})

module.exports = router;
