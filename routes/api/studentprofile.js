const express = require('express');
const router = express.Router();
const axios = require('axios');
const config = require('config');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const TeacherProfile = require('../../models/TeacherProfile');
const StudentProfile = require('../../models/StudentProfile');
const User = require('../../models/User');
const Course = require('../../models/Course');

// @route   GET api/profile/me
// @desc    Get current users profile
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await StudentProfile.findOne({
      user: req.user.id,
    }).populate('user', ['name', 'avatar']);

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile to this user' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/studentprofile
// @desc    Create or update student profile
// @access  Private

router.post('/', auth, async (req, res) => {
  // Build profile object
  const { university } = req.body;

  const profileFields = {};
  profileFields.user = req.user.id;
  if (university) profileFields.university = university;

  try {
    let profile = await StudentProfile.findOne({ user: req.user.id });

    if (profile) {
      //Update
      profile = await StudentProfile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );

      return res.send(profile);
    }

    // Create
    profile = StudentProfile(profileFields);

    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   DELETE api/studentprofile
// @desc    Delete student profile & user
// @access  Private

router.delete('/', auth, async (req, res) => {
  try {
    // Remove profile
    await StudentProfile.findOneAndDelete({ user: req.user.id });
    // Remove user
    await User.findOneAndDelete({ _id: req.user.id });

    res.json({ msg: 'User deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
