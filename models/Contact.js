const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    name: {
        type: String,
        required: String,
    },
    email: {
        type: String,
        required: String,
    },
    text: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = Contact = mongoose.model(
    'contact',
    ContactSchema
);
