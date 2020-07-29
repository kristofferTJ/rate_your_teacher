const mongoose = require('mongoose');

const RequestsSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
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
    },
});

module.exports = Requests = mongoose.model(
    'requests',
    RequestsSchema
);
