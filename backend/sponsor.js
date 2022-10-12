const mongoose = require('mongoose')

const sponsorSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    company: String,
    email: String,
    sponsorLevel: String
})

module.exports = mongoose.model('sponsor', sponsorSchema);