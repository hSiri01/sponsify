const mongoose = require('mongoose')

const zombieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        validate: {
            validator: checkEndDate,
            message: props => `${props.value} must be later than the field date\n`
        }
    },
    price: {
        type: Number,
        required: true
    },
    briefDesc: {
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
        validate: {
            validator: checkSpotsTaken,
            message: props => `${props.value} is a not valid value. either negative or exceeds total spots!\n`
        }
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

function checkSpotsTaken(value) {
    return (value > 0 && value <= this.totalSpots);
}

function checkEndDate(value) {
    return (value > this.date);
}

module.exports = mongoose.model('zombie', zombieSchema);
