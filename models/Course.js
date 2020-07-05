const mongoose = require('mongoose');
const { model } = require('./User');

const CourseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  coursecode: {
    type: String,
    required: true,
  },
  semester: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  teachers: [
    {
      teacher: {
        type: mongoose.Schema.Types.ObjectId,
      },
    },
  ],
});

module.exports = Course = mongoose.model('course', CourseSchema);
