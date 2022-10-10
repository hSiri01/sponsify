const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
    name: String,
    spotsTaken: Number,
    visible: Boolean
})

module.exports = mongoose.model('events', eventSchema);