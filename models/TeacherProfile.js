const mongoose = require('mongoose');

const TeacherProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  name: {
    type: String,
    //required: true,
  },
  university: {
    type: String,
    required: true,
  },

  bio: {
    type: String,
  },
  courses: [
    {
      course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'course',
        unique: true,
      },
      name: {
        type: String,
      },
      coursecode: {
        type: String,
      },
      semester: {
        type: String,
      },
      ratings: [
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
          },
          communication: {
            type: Number,
          },
          knowledge: {
            type: Number,
          },
          assistance: {
            type: Number,
          },
        },
      ],
    },
  ],

  experience: [
    {
      title: {
        type: String,
        required: true,
      },
      workplace: {
        type: String,
        required: true,
      },
      location: {
        type: String,
      },
      from: {
        type: Date,
        required: true,
      },
      to: {
        type: Date,
      },
      current: {
        type: Boolean,
        default: false,
      },
      description: {
        type: String,
      },
    },
  ],
  education: [
    {
      school: {
        type: String,
        required: true,
      },
      degree: {
        type: String,
        required: true,
      },
      fieldofstudy: {
        type: String,
        required: true,
      },
      from: {
        type: Date,
        required: true,
      },
      to: {
        type: Date,
      },
      current: {
        type: Boolean,
        default: false,
      },
      description: {
        type: String,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = TeacherProfile = mongoose.model(
  'teacherprofile',
  TeacherProfileSchema
);
