const mongoose = require('mongoose');

const StudentProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
});

module.exports = StudentProfile = mongoose.model(
  'studentprofile',
  StudentProfileSchema
);
