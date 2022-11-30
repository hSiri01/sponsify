const { parseWithOptions } = require('date-fns/fp');
const mongoose = require('mongoose')

const purchaseSchema = new mongoose.Schema({
    sponsorID: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'sponsor',
        required: true
    },
    events: {
        type: [{
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'event',
        }],
        required: true,
        validate: {
            validator: v => (v.length > 0 || haveZombies(v)),
            message: props => `Events array is empty: ${props.value}`
        }
    },
    zombieEvents: {
        type: [{
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'zombie',
        }],
        required: false
    },
    totalAmount: {
        type: Number,
        required: true
    },
    donationAmount: {
        type: Number,
        required: false
    },
    dateSponsored: {
        type: Date,
        required: true,
        default: () => Date.now()
    },
    org: {
        type: String,
        required: true
    }
})

function haveZombies(value) {
    return (this.zombieEvents && this.zombieEvents.length > 0);
}

module.exports = mongoose.model('purchases', purchaseSchema);