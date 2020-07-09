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

// @route   GET api/courses
// @desc    Get all courses
// @access  Public
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route   POST api/courses
// @desc    Create new Course
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
    if (teachers) CourseFields.courses = teachers;

    try {
      let tmpC = await Course.findOne({ name, coursecode });

      if (tmpC) {
        tmpC = Course.findOneAndUpdate(
          { name, coursecode },
          { $set: CourseFields },
          { new: true }
        );

        return res.json(tmpC);
      }

      tmpC = Course(CourseFields);

      await tmpC.save();
      res.json(tmpC);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: 'Server error' });
    }
  }
);

module.exports = router;
