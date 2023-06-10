const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot } = require('../../db/models');

const router = express.Router();

const validateSignup = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('username')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    check('firstName')
        .exists({ checkFalsy: true })
        .isLength({ min: 1 })
        .withMessage('First Name must not be empty'),
    check('lastName')
        .exists({ checkFalsy: true })
        .isLength({ min: 1 })
        .withMessage('Last Name must not be empty'),
    handleValidationErrors
];

// Sign up
router.post(
    '/',
    validateSignup,
    async (req, res) => {
        const { email, firstName, lastName, password, username } = req.body;
        const hashedPassword = bcrypt.hashSync(password);
        const user = await User.create({ email, firstName, lastName, username, hashedPassword });

        const safeUser = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            username: user.username,
        };

        await setTokenCookie(res, safeUser);

        return res.json({
            user: safeUser
        });
    }
);

// get all spots owned by current user
router.get(
    '/:userId/spots',
    requireAuth,
    async (req, res) => {

        const { userId } = req.params;

        const spots = await Spot.findAll({
            where: {
                ownerId: userId
            }
        })

        res.json({
            spots: spots
        })

    }
)



module.exports = router;
