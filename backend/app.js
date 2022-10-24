require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')
const events = require('./event');
const orgs = require('./org')
const sponsors = require('./sponsor')
const purchases = require('./purchase')
const app = express()
const bodyParser = require('body-parser');
const sponsor = require('./sponsor');
const port = 3001

app.use(bodyParser.json());

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
            else {
                res.send(result[0].FAQ)
            }
        }
    )
})

app.get('/update-FAQ', (req, res) => {
    // res.send('This route will update an FAQ')
    var freq = {
        "FAQ.$.question" : req.body.question,
        "FAQ.$.answer" : req.body.answer
    }

    orgs.findOneAndUpdate(
        { "FAQ._id": req.body.FAQId },
        { $set: freq},
        function (error, success) {
            if (error) {
                console.log("Error", error);
                res.send('Error')
            } else {
                console.log(success);
                res.send('Updated FAQ')
            }
        }
    );
})

app.get('/create-FAQ', (req, res) => {
    // res.send('This route will create a new FAQ')
    var freq = {
        question: req.body.question,
        answer: req.body.answer
    };

    orgs.findOneAndUpdate(
        { name: req.body.organization },
        { $push: { FAQ: freq }},
        function (error, success) {
            if (error) {
                console.log(error);
                res.send('Error')
            } else {
                console.log(success);
                res.send('Created FAQ')
            }
        }
    );
})

app.get('/delete-FAQ', (req, res) => {
    // res.send('This route will delete an FAQ')
    orgs.findOneAndUpdate(
        { name: req.body.organization },
        { $pull: { FAQ: { _id: req.body.FAQId}} },
        function (error, success) {
            if (error) {
                res.send("Error")
            } else {
                res.send("Deleted FAQ")
            }
        }
    )
})

app.get('/get-all-levels/:org', (req, res) => {
    orgs.find({ name: req.params.org })
        .select({ levels: 1 })
        .exec((err, result) => {
            if (err) {
                console.log("Error on get-all-levels, " + err)
            }
            else {
                res.json(result[0].levels)
            }
    })
})

app.get('/get-level-by-amount/:org/:amount', (req, res) => {
    orgs.find({ name: req.params.org })
        .select({ levels: 1 })
        .exec((err, result) => {
            if (err) {
                console.log("Error on get-level-by-amount, " + err)
            }
            else {
                const amount = req.params.amount
                const levels = result[0].levels
                let currLevel = {}

                for (let i = 0; i < levels.length; i++) {
                    if (amount <= levels[i].maxAmount && amount >= levels[i].minAmount) {
                        currLevel = levels[i]
                    }
                }

                res.json(currLevel)
            }
    })
})

app.put('/update-level', (req, res) => {
    var level = {
        "levels.$.minAmount" : req.body.minAmount,
        "levels.$.maxAmount" : req.body.maxAmount,
        "levels.$.name" : req.body.name,
        "levels.$.color" : req.body.color,
        "levels.$.description" : req.body.description
    }

    orgs.findOneAndUpdate(
        { "levels._id": req.body.levelId },
        { $set: level},
        function (error, success) {
            if (error) {
                console.log("Error", error);
                res.send('Error')
            } else {
                console.log(success);
                res.send('Updated sponsorship level')
            }
        }
    );
})

app.post('/create-level', async (req, res) => {
    var level = {
        minAmount: req.body.minAmount,
        maxAmount: req.body.maxAmount,
        name: req.body.name,
        color: req.body.color,
        description: req.body.description
    };

    orgs.findOneAndUpdate(
        { name: req.body.organization },
        { $push: { levels: level }},
        function (error, success) {
            if (error) {
                console.log(error);
                res.send('Error')
            } else {
                console.log(success);
                res.send('Created sponsorship level')
            }
        }
    );
})

app.delete('/delete-level', (req, res) => {
    orgs.findOneAndUpdate(
        { name: req.body.organization },
        { $pull: { levels: { _id: req.body.levelId}} },
        function (error, success) {
            if (error) {
                res.send("Error")
            } else {
                res.send("Deleted level")
            }
        }
    )
})

app.get('/get-enabled-events/:org', (req, res) => {
    events.find({ visible: true, org: req.params.org })
        .exec((err, result) => {
            if (err) {
                console.log("Error on get-enabled-events, " + err)
            }
            else {
                res.send(result)
            }
        }
    )
})

app.get('/get-all-events/:org', (req, res) => {
    events.find({ org: req.params.org })
        .exec((err, result) => {
            if (err) {
                console.log("Error on get-all-events, " + err)
            }
            else {
                res.send(result)
            }
        }
    )
})

app.post('/create-event', async (req, res) => {
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
    let queryStatus = '200'

    if (mongoose.Types.ObjectId.isValid(id)) {
        events.findByIdAndUpdate( id, eventOptions, (err, event) => {
            if (err) {
                console.log('Error on update-event: ' + err)
                queryStatus = '500'
            }
            else {
                console.log('Successfully updated event: \n' + event)
                queryStatus = '200'
            }
        })
    }
    else {
        console.log('Cannot update event, invalid id in request body')
        queryStatus = '400'
    }

    return { status: queryStatus }
}

app.put('/update-event', (req,res) => {
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

app.get('/verify-sponsor-code/:code', (req, res) => {
    // h2kd93n5hs(j

    orgs.find({ eventCode: req.params.code })
        .select({ name: 1 })
        .exec((err, result) => {
            if (err) {
                console.log('Error on verify-sponsor-code, ' + err)
            }
            
            if (result.length == 0) {
                res.json({})
            } else {
                res.json(result[0])
            }
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

    let resStatus = { status: '200' }

    for (let i = 0; i < purchase.events.length; i++) {
        const eventID = purchase.events[i]
        const eventOptions = {
            $inc: { spotsTaken: 1 },
            $push: { sponsors: newSponsor._id }
        }

        const result = updateEvent(eventID, eventOptions)
        if (result.status != '200') {
            resStatus = result
        }
    }

    res.json(resStatus)
    
    // TODO: generate invoice and send follow-up email
})

app.post('/create-sponsor', (req,res) => {
    
    var newSponsor = new sponsors({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        company: req.body.company,
        email:req.body.email,
        sponsorLevel: req.body.sponsorLevel
    });
    newSponsor.save((err) => {
        if (err) console.log( "Error on create sponsor, " + err);
        //else it saved
    });
})

app.get('/get-org-info/:org', (req,res) => {
    orgs.find({ name: req.params.org })
        .exec((err, result) => {
            if (err) {
                console.log("Error on get-org-info, " + err)
            }
            else {
                res.json(result[0])
            }
    })
})

app.get('/update-org-info', (req,res) => {
    
    const id = req.body.id
    if (!id) {
        console.log('Cannot update org, no id in request body')
        res.json({ status: '400'})
    }
    else {
        if (mongoose.Types.ObjectId.isValid(id)) {
            
            orgs.findByIdAndUpdate( id, { '$set': { name: req.body.name, fundName : req.body.fundName, address: req.body.address} }, (err, event) => {
                if (err) {
                    console.log('Error on update-org-info: ' + err)
                }
                else {
                    console.log('Successfully updated org info: \n' + event)
                }
            })
        }
        else {
            console.log('Cannot update org-info, invalid id in request body')
        }
    }
    
    
})

app.get('/get-valid-admins/:org', (req,res) => {
    orgs.find({ name: req.params.org })
        .select({ validAdmins: 1 })
        .exec((err, result) => {
            if (err) {
                console.log("Error on get-valid-admins, " + err)
            }
            else {
                res.json(result[0])
            }
    })
})

app.get('/get-event-code/:org', (req,res) => {
    orgs.find({ name: req.params.org })
        .select({ eventCode: 1 })
        .exec((err, result) => {
            if (err) {
                console.log("Error on get-event-code, " + err)
            }
            else {
                res.json(result[0])
            }
    })
})

app.get('/get-logo/:org', (req,res) => {
    orgs.find({ name: req.params.org })
        .select({ logoImage: 1 })
        .exec((err, result) => {
            if (err) {
                console.log("Error on get-logo, " + err)
            }
            else {
                res.json(result[0])
            }
    })
})

app.get('/get-org', (req,res) => {
    res.send('Get org')
})

app.listen(port, () => {
    console.log(`App listening on port ${port} :)`)
})
