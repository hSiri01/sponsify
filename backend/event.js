const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    date: Date,
    endDate: Date,
    price: {
        type: Number,
        required: true
    },
    description: String,
    briefDescription: String,
    totalSpots: {
        type: Number,
        required: true
    },
    spotsTaken: {
        type: Number,
        required: true
    },
    visible: {
        type: Boolean,
        required: true,
        default: false
    },
    sponsors: [mongoose.SchemaTypes.ObjectId]
})

module.exports = mongoose.model('events', eventSchema);