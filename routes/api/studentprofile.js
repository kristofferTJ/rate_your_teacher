const express = require('express');
const router = express.Router();
//const axios = require('axios');
//const config = require('config');
const auth = require('../../middleware/auth');
//const { check, validationResult } = require('express-validator');

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

// @route   DELETE api/studentprofile/:teacher_id/:course_id
// @desc    Rate teacher to given course
// @access  Private

router.put('/:teacher_id/:course_id', auth, async (req, res) => {
  const {
    communication,
    knowledge,
    assistance,
    assignment,
    book,
    passion,
    looks,
    language,
  } = req.body;

  const newRating = {
    user: req.user.id,
    communication,
    knowledge,
    assistance,
    assignment,
    book,
    passion,
    looks,
    language,
  };

  try {
    const teacher = await TeacherProfile.findById(req.params.teacher_id);
    const C = await Course.findById(req.params.course_id);
    if (!C) {
      return res
        .status(404)
        .json({ msg: 'This course is not in our database' });
    }
    if (teacher) {
      var course = teacher.courses.find((cour) => {
        return cour._id.toString() === req.params.course_id;
      });
      if (!course) {
        return res
          .status(404)
          .json({ msg: 'This teacher does not have this subject' });
      }
      var ratings = course.ratings;

      if (ratings.some((rate) => rate.user == req.user.id)) {
        ratings = ratings.filter((obj) => {
          obj.user.toString() !== req.user.id;
        });
      }
      ratings.unshift(newRating);
      teacher.ratings = ratings;

      await teacher.save();
      return res.json(ratings);
    }
    res.status(404).json({ msg: 'Could not find teacher' });
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Course/Teacher not found' });
    }
    res.status(404).json({ msg: 'Page not found' });
  }
});

module.exports = router;
