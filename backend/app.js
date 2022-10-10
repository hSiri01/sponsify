require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 3001

mongoose.connect(
    process.env.MONGODB_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)

const db = mongoose.connection;  // access default connection
db.on('error', console.error.bind(console, 'MongoDB connection error'))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`App listening on port ${port} :)`)
})
app.get('/create-sponsor', (req,res) => {
    res.send('Create Sponsor')
})
app.get('/update-event', (req,res) => {
    res.send('Update Event')
})
app.get('/delete-event', (req,res) => {
    res.send('Delete Event')
})
app.get('/checkout', (req,res) => {
    res.send('Checkout')
})