const mongoose = require('mongoose')

const orgSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    fundName: {
        type: String,
        default: ""
    },
    address: {
        streetAddress: String,
        zip: Number,
        city: String,
        state: String,
        country: String
    },
    eventCode: {
        type: String,
        required: true
    },
    validAdmins: {
        type: [String],
        default: []
    },
    FAQ: {
        type: [{
            question: String,
            answer: String
        }],
        default: []
    },
    levels: {
        type: [{
            minAmount: Number,
            maxAmount: Number,
            name: String,
            color: String,
            description: String
        }],
        default: []
    },
    events: {
        type: [{
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'event'
        }],
        default: []
    },
    exampleInvoice: {
        type: String,
        default: ""
    }
})

module.exports = mongoose.model('organizations', orgSchema);