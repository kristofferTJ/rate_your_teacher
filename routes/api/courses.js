const express = require('express');
const router = express.Router();
const config = require('config');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const TeacherProfile = require('../../models/TeacherProfile');
const StudentProfile = require('../../models/StudentProfile');
const User = require('../../models/User');
const Course = require('../../models/Course');

// @route   GET api/courses
// @desc    Get all courses
// @access  Public
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find().populate({
      path: 'teachers',
      select: 'bio',
      model: 'teacherprofile',
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

    const { name, coursecode, semester, year, teachers } = req.body;

    const CourseFields = {};
    if (name) CourseFields.name = name;
    if (coursecode) CourseFields.coursecode = coursecode;
    if (semester) CourseFields.semester = semester;
    if (year) CourseFields.year = year;
    //if (teachers) CourseFields.courses = teachers;

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
    const course = await Course.findById(req.params.course_id);
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

module.exports = router;
