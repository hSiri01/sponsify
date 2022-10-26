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
        validate: {
            validator: v => v >= 0,
            message: props => `${props.value} is a negative number\n`
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

eventSchema.pre('validate', (next) => {
    if (this.spotsTaken > this.totalSpots) {
        next(new Error('spots taken must be less than or equal to total spots'));
    } else {
        next();
    }
});

module.exports = mongoose.model('events', eventSchema);