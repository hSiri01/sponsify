const mongoose = require('mongoose')

const sponsorSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    sponsorLevel: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('sponsor', sponsorSchema);