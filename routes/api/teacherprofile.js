const express = require('express');
const router = express.Router();
const config = require('config');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const TeacherProfile = require('../../models/TeacherProfile');
const User = require('../../models/User');
const Course = require('../../models/Course');

// @Todo  Make route public, different depending on who wants to see profile

// @route   GET api/teacherprofile/me
// @desc    Get current users profile
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await TeacherProfile.findOne({
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

// @route   POST api/teacherprofile
// @desc    Create or update user profile
// @access  Private

router.post('/', auth, [
  [check('university', 'University is required').not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { university, bio, courses } = req.body;

    // Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (university) profileFields.university = university;
    if (bio) profileFields.bio = bio;
    if (courses) profileFields.courses = courses;

    try {
      let profile = await TeacherProfile.findOne({ user: req.user.id });

      if (profile) {
        //Update
        profile = await TeacherProfile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );

        return res.send(profile);
      }

      // Create
      profile = TeacherProfile(profileFields);

      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  },
]);

// @route   GET api/teacherprofile
// @desc    Get all teacher profiles
// @access  Public

<<<<<<< HEAD
router.get('/teachers', async (req, res) => {
=======
router.get('/', async (req, res) => {
>>>>>>> 4df7e8642135e9eb28ae6fe6460d5d5a07250f3f
  try {
    const profiles = await TeacherProfile.find().populate('user', [
      'name',
      'avatar',
    ]);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public

router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await TeacherProfile.findOne({
      user: req.params.user_id,
    }).populate('user', ['name', 'avatar']);

    if (!profile) return res.status(400).json({ msg: 'Profile not found' });

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route   GET api/profile/profile/:profile_id
// @desc    Get profile by profile ID
// @access  Public

router.get('/profile/:profile_id', async (req, res) => {
  try {
    const profile = await TeacherProfile.findOne({
      _id: req.params.profile_id,
    }).populate('user', ['name', 'avatar']);

    if (!profile) return res.status(400).json({ msg: 'Profile not found' });

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    res.status(500).send('Server error');
  }
});

// This one is not really wanted, but maybe just to delete user

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

// @route   PUT api/profile/courses
// @desc    Add course to teachers courselist
// @access  Private

router.put('/course/:course_id', auth, async (req, res) => {
  try {
    const teacher = await TeacherProfile.findOne({ user: req.user.id });
    let currentCourses = teacher.courses;

    if (
      currentCourses.some((cor) => cor._id.toString() === req.params.course_id)
    ) {
      return res
        .status(400)
        .json({ msg: 'This teacher already has this course' });
    }
    const course = await Course.findById({ _id: req.params.course_id });
    if (!course) {
      return res.status(400).json({ msg: 'The Course is not in our database' });
    }
    currentCourses.unshift(course._id);
    teacher.courses = currentCourses;
    await teacher.save();
    if (!course.teachers.some((t) => t._id.toString() === req.user.id)) {
      course.teachers.unshift(req.user.id);
      await course.save();
    }
    res.json(teacher.populate('courses.course', ['name', 'coursecode']));
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Course not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route   DELETE api/profile/:course_id
// @desc    Delete course from profile
// @access  Private
router.delete('/course/:course_id', auth, async (req, res) => {
  try {
    const profile = await TeacherProfile.findOne({ user: req.user.id });
    const course = await Course.findById({
      _id: JSON.stringify(req.params.course_id),
    });

    profile.courses = profile.courses.filter(
      (cor) => cor._id.toString() !== req.params.exp_id
    );

    course.teachers = course.teachers.filter((teach) => {
      teach._id.toString() !== profile._id.toString();
    });

    await profile.save();
    await course.save();

    res.json(profile);
  } catch (error) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT api/profile/experience
// @desc    Add profile experience
// @access  Private

router.put(
  '/experience',
  [
    auth,
    [
      check('title', 'Title is required').not().isEmpty(),
      check('company', 'Company is required').not().isEmpty(),
    ],
    check('from', 'From date is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      title,
      workplace,
      location,
      from,
      to,
      current,
      description,
    } = req.body;

    const newExp = {
      title,
      workplace,
      location,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await TeacherProfile.findOne({ user: req.user.id });

      profile.experience.unshift(newExp);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   DELETE api/profile/experience/:exp_id
// @desc    Delete experience from profile
// @access  Private

router.delete('/experience/:exp_id', auth, async (req, res) => {
  try {
    const profile = await TeacherProfile.findOne({ user: req.user.id });

    profile.experience = profile.experience.filter(
      (exp) => exp._id.toString() !== req.params.exp_id
    );

    await profile.save();

    res.json(profile);
  } catch (error) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route    PUT api/profile/education
// @desc     Add profile education
// @access   Private
router.put(
  '/education',
  [
    auth,
    [
      check('school', 'School is required').not().isEmpty(),
      check('degree', 'Degree is required').not().isEmpty(),
      check('fieldofstudy', 'Field of study is required').not().isEmpty(),
      check('from', 'From date is required and needs to be from the past')
        .not()
        .isEmpty(),
      //       .custom((value, { req }) => (req.body.to ? value < req.body.to : true)),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    } = req.body;

    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await TeacherProfile.findOne({ user: req.user.id });

      profile.education.unshift(newEdu);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    DELETE api/profile/education/:edu_id
// @desc     Delete education from profile
// @access   Private

router.delete('/education/:edu_id', auth, async (req, res) => {
  try {
    const foundProfile = await TeacherProfile.findOne({ user: req.user.id });
    foundProfile.education = foundProfile.education.filter(
      (edu) => edu._id.toString() !== req.params.edu_id
    );
    await foundProfile.save();
    return res.status(200).json(foundProfile);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
