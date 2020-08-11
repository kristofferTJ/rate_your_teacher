const mongoose = require('mongoose');
const { schema } = require('./TeacherProfile');

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
      type: mongoose.Schema.Types.ObjectId,
      ref: 'teacherprofile',
    },
  ],
  ratings: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
      },
      inspiring: {
        type: Number,
      },
      futureapplicable: {
        type: Number,
      },
      structure: {
        type: Number,
      },
      assignments: {
        type: Number,
      },
      comprehensible: {
        type: Number,
      },
      timeconsuming: {
        type: Number,
      },
      fieldrelevance: {
        type: Number,
      },
      labsessions: {
        type: Number,
      },
    },
  ],
  alternatives: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
      },

      alternative: {
        type: String,
        required: true,
      },
      likes: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'user',
          unique: true,
        },
      ],
      dislikes: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'user',
          unique: true,
        },
      ],
    },
  ],
});

module.exports = Course = mongoose.model('course', CourseSchema);
