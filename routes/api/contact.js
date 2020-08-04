const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Contact = require('../../models/Contact');

// @Todo  Make route public, different depending on who wants to see profile


// @route   POST api/contact
// @desc    Create contact
// @access  Private

router.post('/', auth, [
    [check('name', 'Name is required').not().isEmpty()],
    [check('email', 'Email is required').not().isEmpty()],
    async (req, res) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            console.log(errors)
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, text } = req.body;

        // Build profile object
        const contactFields = {};
        contactFields.user = req.user.id;
        contactFields.name = name;
        contactFields.email = email;
        if (text) contactFields.text = text;

        try {
            // Create
            contact = Contact(contactFields);

            await contact.save();
            res.json(contact);
            console.log(contact)
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    },
]);

// @route   GET api/contact
// @desc    Get all contacts
// @access  Public

router.get('/', async (req, res) => {
    try {
        var contacts = await Contact.find();

        res.json(contacts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


// @route   DELETE api/contact
// @desc    Delete contact
// @access  Private

router.delete('/:_id', async (req, res) => {
    console.log("eple")
    try {
        // Remove profile
        await Contact.findOneAndDelete({ _id: req.params._id });

        res.json({ msg: 'User deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


module.exports = router;
