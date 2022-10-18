require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')
const events = require('./event');
const orgs = require('./org')
const sponsors = require('./sponsor')
const purchases = require('./purchase')
const app = express()
const bodyParser = require('body-parser')
const port = 3001

app.use(bodyParser.json());

process.once('SIGUSR2', function () {
    process.kill(process.pid, 'SIGUSR2');
  });
  
  process.on('SIGINT', function () {
    // this is only called on ctrl+c, not restart
    process.kill(process.pid, 'SIGINT');
  });

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

function getLevel(amount, org) {
    orgs.find({ name: org })
        .select({ levels: 1 })
        .exec((err, result) => {
            if (err) {
                console.log("Error on get-level-by-amount, " + err)
            }

            const amount = amount
            const levels = result[0].levels
            let currLevel = {}

            for (let i = 0; i < levels.length; i++) {
                if (amount <= levels[i].maxAmount && amount >= levels[i].minAmount) {
                    currLevel = levels[i]
                }
                console.log(levels[i])
            }
        })

}

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
    events.find({ org: req.params.org })
        .exec((err, result) => {
            if (err) {
                console.log("Error on get-all-events, " + err)
            }
            res.send(result)
        }
    )
})

app.post('/create-event', async (req, res) => {
    // console.log(req.body);

    const newEvent = new events({
        name: req.body.name,
        date: req.body.date,
        endDate: req.body.endDate,
        price: req.body.price,
        description: req.body.desc,
        briefDescription: req.body.briefDesc,
        avgAttendance: req.body.avgAttendance,
        totalSpots: req.body.totalSpots,
        spotsTaken: 0,
        visible: req.body.visible,
        org: req.body.org,
        sponsors: []
    })

    // console.log(newEvent)

    newEvent.save((err) => {
        if (err) {
            console.log('Error on create-event: ' + err)
            res.json({ status: '500'})
        }
        else {
            console.log('Created new event')
            res.json({ status: '200' })
        }
    })
})

function updateEvent(id, eventOptions) {
    if (mongoose.Types.ObjectId.isValid(id)) {
        events.findByIdAndUpdate( id, eventOptions, (err, event) => {
            if (err) {
                console.log('Error on update-event: ' + err)
                return {status: '500'}
            }
            else {
                console.log('Successfully updated event: \n' + event)
                return { status: '200'}
            }
        })
    }
    else {
        console.log('Cannot update event, invalid id in request body')
        return { status: '400'}
    }
}

app.put('/update-event', (req,res) => {
    // console.log(req.body)
    const id = req.body.id

    if (!id) {
        console.log('Cannot update event, no id in request body')
        res.json({ status: '400'})
    }
    else {
        const eventOptions = {
            name: req.body.name,
            briefDescription: req.body.briefDesc,
            date: req.body.date,
            endDate: req.body.endDate,
            price: req.body.price,
            totalSpots: req.body.totalSpots,
            spotsTaken: req.body.spotsTaken,
            description: req.body.desc,
            visible: req.body.visible
        }
    
        res.json(updateEvent(id, eventOptions))
    }
})

app.delete('/delete-event', (req,res) => {
    // console.log(req.body)
    const id = req.body.id

    if (!id) {
        console.log('Cannot delete event, no id in request body')
        res.json({ status: '400'})
    }
    else {
        if (mongoose.Types.ObjectId.isValid(id)) {
            events.findByIdAndRemove( id, (err, event) => {
                if (err) {
                    console.log('Error on delete-event: ' + err)
                    res.json({ status: '500' })
                }
                else {
                    console.log('Successfully deleted event: \n' + event)
                    res.json({ status: '200' })
                }
            })
        }
        else {
            console.log('Cannot delete event, invalid id in request body')
            res.json({ status: '400'})
        }
    }
})

app.get('/get-org/:code', (req, res) => {
    console.log(req.params.code)
    // h2kd93n5hs(j

    orgs.find({ eventCode: req.params.code })
        .select({ name: 1 })
        .exec((err, result) => {
            if (err) {
                console.log('Error on get-org, ' + err)
            }
            res.json(result[0])
            console.log(result[0])
    })
})

app.post('/checkout-event', (req,res) => {
    // create new sponsor
    var newSponsor = new sponsors({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        company: req.body.company,
        email:req.body.email,
        sponsorLevel: req.body.sponsorLevel
    })

    newSponsor.save((err) => {
        if (err) {
            console.log( 'Error on create sponsor, ' + err)
            res.json({ status: '500'})
        }
        else {
            console.log('New sponsor created, id: ' + newSponsor._id)
        }
    });

    // create a purchase
    const purchase = new purchases({
        sponsorID: newSponsor._id,
        events: req.body.events,
        totalAmount: req.body.totalAmount,
        dateSponsored: Date.now(),
        org: req.body.org
    })

    purchase.save((err) => {
        if (err) {
            console.log('Error on creating a purchase: ' + err)
            res.json({ status: '500'})
        }
        else {
            console.log('Created new purchase')
        }
    })

    for (let i = 0; i < purchase.events.length; i++) {
        let eventID = purchase.events[i]
        let eventOptions = {
            $inc: { spotsTaken: 1 },
            $push: { sponsors: newSponsor._id }
        }

        res.json(updateEvent(eventID, eventOptions))
    }

    // TODO: generate invoice and send follow-up email
})

app.get('/create-sponsor', (req,res) => {
    res.send('Create Sponsor')
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
