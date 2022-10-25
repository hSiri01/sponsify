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
    description: {
        type: String,
        default: ""
    },
    briefDescription: {
        type: String,
        default: ""
    },
    avgAttendance: {
        type: Number,
        required: false
    },
    totalSpots: {
        type: Number,
        required: true
    },
    spotsTaken: {
        type: Number,
        required: true,
        default: 0
    },
    visible: {
        type: Boolean,
        required: true,
        default: false
    },
    org: {
        type: String,
        required: true
    },
    sponsors: {
        type: [{
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'sponsor'
        }],
        default: []
    }
})

module.exports = mongoose.model('event', eventSchema);