const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema({
    name: {
        type: String,
        required: String,
    },
    university: {
        type: String,
        required: String,
    },
    course: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

module.exports = Requests = mongoose.model(
    'requests',
    RequestSchema
);
