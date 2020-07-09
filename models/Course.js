const mongoose = require('mongoose');

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
        ref: 'teacherprofile',
      },
    },
  ],
});

module.exports = Course = mongoose.model('course', CourseSchema);
