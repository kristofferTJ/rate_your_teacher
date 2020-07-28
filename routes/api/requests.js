const express = require('express');
const router = express.Router();
const config = require('config');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const TeacherProfile = require('../../models/TeacherProfile');
const User = require('../../models/User');
const Requests = require('../../models/Requests');

// @Todo  Make route public, different depending on who wants to see profile


// @route   POST api/teacherprofile
// @desc    Create or update teacher profile
// @access  Private

router.post('/', [
    [check('name', 'Name is required').not().isEmpty()],
    [check('uni', 'University is required').not().isEmpty()],
    async (req, res) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            console.log(errors)
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, uni, course } = req.body;

        // Build profile object
        const requestFields = {};
        //requestFields.user = req.user.id;
        requestFields.name = name;
        requestFields.university = uni;
        if (course) requestFields.course = course;

        try {
            let request = await Requests.findOne({ name: requestFields.name });

            if (request) {

                return res.send(request);
            }

            // Create
            request = Requests(requestFields);

            await request.save();
            res.json(request);
            console.log(request)
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    },
]);

// @route   GET api/teacherprofile
// @desc    Get all teacher profiles
// @access  Public

router.get('/', async (req, res) => {
    try {
        var requests = await Requests.find();

        res.json(requests);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

/*
// @route   DELETE api/teacherprofile
// @desc    Delete teacher profile & user
// @access  Private

router.delete('/', auth, async (req, res) => {
    try {
        // Remove profile
        await TeacherProfile.findOneAndDelete({ user: req.user.id });
        // Remove user
        await User.findOneAndDelete({ _id: req.user.id });

        res.json({ msg: 'User deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});
*/

module.exports = router;