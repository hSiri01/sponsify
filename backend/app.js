require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 3000

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
    res.send('Hello World')
})

app.listen(port, () => {
    console.log(`App listening on port ${port} :)`)
})