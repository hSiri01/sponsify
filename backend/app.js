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

app.get('/get-enabled-events', (req, res) => {
    res.send('This page will show enabled events')
})

app.get('/get-all-events', (req, res) => {
    res.send('This page will show all events')
})

app.get('/create-event', (req, res) => {
    res.send('Create event')
})

app.listen(port, () => {
    console.log(`App listening on port ${port} :)`)
})