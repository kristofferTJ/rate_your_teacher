const express = require('express');
const router = express.Router();
const config = require('config');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const TeacherProfile = require('../../models/TeacherProfile');
const StudentProfile = require('../../models/StudentProfile');
const User = require('../../models/User');
const Course = require('../../models/Course');
const { populate } = require('../../models/TeacherProfile');

// @route   GET api/courses
// @desc    Get all courses
// @access  Public
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find().populate({
      path: 'teachers',
      select: 'bio',
      model: 'teacherprofile',
      populate: {
        path: 'user',
        select: 'name',
        model: 'user',
      },
    });

    res.json(courses);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route   POST api/courses
// @desc    Create new or update Course
// @access  Private
router.post(
  '/',
  auth,
  [
    check('name', 'Need to put in the name of the course').exists(),
    check(
      'coursecode',
      'Needs to be three letters and the four numbers'
    ).isLength(7),
    check('semester', 'Needs to be either F or S').exists(),
    check('year', 'A valid year is required').isNumeric(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, coursecode, semester, year } = req.body;

    const CourseFields = {};
    if (name) CourseFields.name = name;
    if (coursecode) CourseFields.coursecode = coursecode;
    if (semester) CourseFields.semester = semester;
    if (year) CourseFields.year = year;

    try {
      let tmpC = await Course.findOne({ name, coursecode });
      if (tmpC) {
        tmpC = await Course.findOneAndUpdate(
          { _id: tmpC._id },
          { $set: CourseFields },
          { new: true }
        );

        return res.json(tmpC);
      }

      tmpC = new Course(CourseFields);

      await tmpC.save();
      res.json(tmpC);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: 'Server error' });
    }
  }
);

// @route   GET api/courses/:course_id
// @desc    Get course by ID
// @access  Public
router.get('/:course_id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.course_id).populate({
      path: 'teachers',
      populate: {
        path: 'user',
        select: 'name',
        model: 'user',
      },
    });
    if (course) {
      return res.json(course);
    }

    res.status(404).json({ msg: 'Course not found' });
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ msg: 'Course not found' });
    }
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route   PUT api/courses/:course_id
// @desc    Rate course
// @access  Private

router.put('/:course_id', auth, async (req, res) => {
  const {
    inspiring,
    futureapplicable,
    structure,
    assignments,
    comprehensible,
    timeconsuming,
    fieldrelevance,
    labsessions,
  } = req.body;

  const newRating = {
    user: req.user.id,
    inspiring,
    futureapplicable,
    structure,
    assignments,
    comprehensible,
    timeconsuming,
    fieldrelevance,
    labsessions,
  };

  try {
    const course = await Course.findById(req.params.course_id);
    if (!course) {
      return res
        .status(404)
        .json({ msg: 'This course is not in our database' });
    }
    if (course.ratings.some((rating) => rating.user == req.user.id)) {
      course.ratings = course.ratings.filter((obj) => {
        obj.user.toString() !== req.user.id;
      });
    }
    course.ratings.unshift(newRating);

    await course.save();
    return res.json(course);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Course not found' });
    }
    res.status(404).json({ msg: 'Page not found' });
  }
});

// @route   PUT api/courses/:course_id/alternatives
// @desc    Add alterntive methods to learn subject
// @access  Private

router.put(
  '/alternatives/:course_id',
  auth,
  [check('alternative', 'Need to put in alternative').exists()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const course = await Course.findById(req.params.course_id);

      const { alternative } = req.body;

      const alt = {
        user: req.user.id,
        alternative,
        likes: [],
        dislikes: [],
      };

      course.alternatives.unshift(alt);
      await course.save();
      return res.json(course);
    } catch (err) {
      if (err.kind == 'ObjectId') {
        return res.status(400).json({ msg: 'Course not found' });
      }
      res.status(400).json({ msg: 'Server error' });
    }
  }
);

// @route   PUT api/courses/like/:course_id/:alt_id
// @desc    Like alternative
// @access  Private

router.put('/like/:course_id/:alt_id', auth, async (req, res) => {
  try {
    const course = await Course.findById(req.params.course_id);

    //console.log(course);

    var alt = course.alternatives.find((cor) => {
      return cor._id.toString() === req.params.alt_id;
    });

    console.log(alt);

    alt.dislikes.filter((user) => {
      user.user.toString() !== req.user.id;
    });
    console.log('123');
    alt.likes.forEach((element) => {
      console.log(element);
    });
    if (
      alt.likes.some((user) => {
        return user.toString() === req.user.id;
      })
    ) {
      console.log('zevs');
      return res.json({ msg: 'Already liked this alternative' });
    }
    alt.likes.unshift(req.user.id);
    course.alternative = alt;
    console.log('HAdes');

    await course.save();
    return res.json(course);
  } catch (err) {
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Course not found' });
    }
    res.status(400).json({ msg: 'Server error' });
  }
});

module.exports = router;
