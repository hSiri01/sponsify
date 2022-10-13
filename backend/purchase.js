const { parseWithOptions } = require('date-fns/fp');
const mongoose = require('mongoose')

const purchaseSchema = new mongoose.Schema({
    sponsorID: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    events: {
        type: [mongoose.SchemaTypes.ObjectId],
        required: true,
        validate: {
            validator: v => v.length > 0,
            message: props => `Events array is empty: ${props.value}`
        }
    },
    totalAmount: {
        type: Number,
        required: true
    },
    dateSponsored: {
        type: Date,
        required: true,
        default: () => Date.now()
    },
})

module.exports = mongoose.model('purchases', purchaseSchema);