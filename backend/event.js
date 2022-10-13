const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
    name: String,
    date: Date,
    endDate: Date,
    price: Number,
    description: String,
    briefDescription: String,
    totalSpots: Number,
    spotsTaken: Number,
    visible: Boolean,
    sponsors: [mongoose.SchemaTypes.ObjectId]
})

module.exports = mongoose.model('events', eventSchema);