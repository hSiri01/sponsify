const mongoose = require('mongoose')

const requestSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ""
    }
})

module.exports = mongoose.model('requests', requestSchema);