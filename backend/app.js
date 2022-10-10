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

// Access database connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error!!\n'))

app.get('/', (req, res) => {
    res.send('Hello! This is the default route for the backend server.')
})

app.get('/get-all-FAQ', (req, res) => {
    res.send('This route will retrieve all FAQs for a given org')
})

app.get('/update-FAQ', (req, res) => {
    res.send('This route will update an FAQ')
})

app.get('/create-FAQ', (req, res) => {
    res.send('This route will create a new FAQ')
})

app.get('/delete-FAQ', (req, res) => {
    res.send('This route will delete an FAQ')
})

app.listen(port, () => {
    console.log(`App listening on port ${port} :)`)
})