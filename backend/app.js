require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')
const events = require('./event');
const orgs = require('./org')
const sponsors = require('./sponsor')
const purchases = require('./purchase')
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

app.get('/get-all-FAQ/:org', (req, res) => {
    orgs.find({ name: req.params.org })
        .select({ FAQ: 1 })
        .exec((err, result) => {
            if (err) {
                console.log("Error on get-all-FAQ, " + err)
            }
            res.send(result[0].FAQ)
            console.log(result[0])
        }
    )
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

app.get('/get-all-levels/:org', (req, res) => {
    orgs.find({ name: req.params.org })
        .select({ levels: 1 })
        .exec((err, result) => {
            if (err) {
                console.log("Error on get-all-levels, " + err)
            }
            res.json(result[0])
            console.log(result[0])
    })
})

app.get('/get-level-by-amount/:org/:amount', (req, res) => {
    orgs.find({ name: req.params.org })
        .select({ levels: 1 })
        .exec((err, result) => {
            if (err) {
                console.log("Error on get-level-by-amount, " + err)
            }

            const amount = req.params.amount
            const levels = result[0].levels
            let currLevel = {}

            for (let i = 0; i < levels.length; i++) {
                if (amount <= levels[i].maxAmount && amount >= levels[i].minAmount) {
                    currLevel = levels[i]
                }
                console.log(levels[i])
            }

            res.json(currLevel)
    })
})

app.get('/update-level', (req, res) => {
    res.send('Update sponsorship level')
})

app.get('/create-level', (req, res) => {
    res.send('Create sponsorship level')
})

app.get('/delete-level', (req, res) => {
    res.send('Delete sponsorship level')
})

app.get('/get-enabled-events/:org', (req, res) => {
    events.find({ visible: true, name: req.params.org })
        .exec((err, result) => {
            if (err) {
                console.log("Error on get-enabled-events, " + err)
            }
            res.send(result)
        }
    )
})

app.get('/get-all-events/:org', (req, res) => {
    events.find({ name: req.params.org })
        .exec((err, result) => {
            if (err) {
                console.log("Error on get-all-events, " + err)
            }
            res.send(result)
        }
    )
})

app.get('/create-event', (req, res) => {
    res.send('Create event')
})

app.get('/get-org/:code', (req, res) => {
    console.log(req.params.code)
    // h2kd93n5hs(j

    orgs.find({ eventCode: req.params.code })
        .select({ name: 1 })
        .exec((err, result) => {
            if (err) {
                console.log("Error on get-org, " + err)
            }
            res.json(result[0])
            console.log(result[0])
    })
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

app.get('/get-org-info/:org', (req,res) => {
    orgs.find({ name: req.params.org })
        .exec((err, result) => {
            if (err) {
                console.log("Error on get-org-info, " + err)
            }
            res.json(result[0])
            console.log(result[0])
    })
})

app.get('/update-org-info', (req,res) => {
    res.send('Update org info')
})

app.get('/get-valid-admins/:org', (req,res) => {
    orgs.find({ name: req.params.org })
        .select({ validAdmins: 1 })
        .exec((err, result) => {
            if (err) {
                console.log("Error on get-valid-admins, " + err)
            }
            res.json(result[0])
            console.log(result[0])
    })
})

app.get('/get-event-code/:org', (req,res) => {
    orgs.find({ name: req.params.org })
        .select({ eventCode: 1 })
        .exec((err, result) => {
            if (err) {
                console.log("Error on get-event-code, " + err)
            }
            res.json(result[0])
            console.log(result[0])
    })
})

app.get('/get-logo/:org', (req,res) => {
    orgs.find({ name: req.params.org })
        .select({ logoImage: 1 })
        .exec((err, result) => {
            if (err) {
                console.log("Error on get-logo, " + err)
            }
            res.json(result[0])
            console.log(result[0])
    })
})

app.get('/verify-sponsor-code', (req,res) => {
    res.send('Verify sponsor code')
})

app.listen(port, () => {
    console.log(`App listening on port ${port} :)`)
})
