const express = require('express');
const router = express.Router();
const config = require('config');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Requests = require('../../models/Requests');

// @Todo  Make route public, different depending on who wants to see profile


// @route   POST api/request
// @desc    Create request
// @access  Private

router.post('/', auth, [
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, university, course } = req.body;

        // Build profile object
        const profileFields = {};
        profileFields.name = name;
        profileFields.university = university;
        if (course) profileFields.course = course;

        try {
            let profile = await Requests.findOne({ name: req.name, university: req.university });

            if (profile) {

                return res.send(profile);
            }

            // Create
            profile = Requests(profileFields);

            await profile.save();
            res.json(profile);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    },
]);

// @route   GET api/request
// @desc    Get all requests
// @access  Public

router.get('/', async (req, res) => {
    try {
        console.log("tryy")
        var requests = await Requests.find();
        console.log(requests);
        res.json(requests);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   DELETE api/request
// @desc    Delete request
// @access  Private

router.delete('/', auth, async (req, res) => {
    try {
        // Remove profile
        await Requests.findOneAndDelete({ id: req.id });
        // Remove user

        res.json({ msg: 'User deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
