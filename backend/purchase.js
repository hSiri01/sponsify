const mongoose = require('mongoose')

const purchaseSchema = new mongoose.Schema({
    sponsorID: mongoose.SchemaTypes.ObjectId,
    events: [mongoose.SchemaTypes.ObjectId],
    totalAmount: Number,
    dateSponsored: Date
})

module.exports = mongoose.model('purchases', purchaseSchema);