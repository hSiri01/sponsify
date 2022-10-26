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
        required: true,
        validate: {
            validator: v => v >= eventSchema.spotsTaken,
            message: props => `${props.value} is less than spotsTaken\n`
        }
    },
    spotsTaken: {
        type: Number,
        required: true,
        validate: {
            validator: v => (v <= eventSchema.totalSpots) && (v >= 0),
            message: props => `${props.value} is greater than totalSpots\n`
        }
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

module.exports = mongoose.model('events', eventSchema);