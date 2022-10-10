const mongoose = require('mongoose')

const orgSchema = new mongoose.Schema({
    name: String,
    FAQ: [{
        question: String,
        answer: String
    }]
})

module.exports = mongoose.model('organizations', orgSchema);