const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const EventSchema = new Schema({
    name: String,
    logo_image: String,
    address: {
        street_address: String,
        zipcode: Number,
        city: String,
        state: String,
        country: String
    },
    eventCode: String,
    valid_admins: [String],
    FAQ: [{
        question: String,
        answer: String
    }],
    levels: [{
        min_amount: Number,
        max_amount: Number,
        name: String,
        color: String,
        description: String
    }],
    events: [Schema.Types.ObjectId],
})