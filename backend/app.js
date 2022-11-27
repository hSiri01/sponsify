require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const requests = require('./models/request')
const events = require('./models/event')
const orgs = require('./models/org')
const sponsors = require('./models/sponsor')
const purchases = require('./models/purchase')
const zombieEvents = require('./models/zombie')
const app = express()
const bodyParser = require('body-parser');
const path = require('path');
const sponsor = require('./models/sponsor');
var cors = require('cors');
var async = require('async');
app.use(cors())


const port = process.env.PORT || 5000;
const sgMail = require('@sendgrid/mail')
var cors = require('cors');
app.use(cors())

//adding routes for image upload
var fs = require('fs');
var multer = require('multer');
const { sub } = require('date-fns');

//adding routes for image upload
var fs = require('fs');
var multer = require('multer');
const { BedtimeOffRounded } = require('@mui/icons-material');
app.use("/images", express.static("./images"));
app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}))
// Serve static files from the React app
app.use(express.static(path.join(__dirname, '..', 'build')));

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

app.put('/update-FAQ', (req, res) => {
    // res.send('This route will update an FAQ')
    var freq = {
        "FAQ.$.question": req.body.question,
        "FAQ.$.answer": req.body.answer,
        
    }

    orgs.findOneAndUpdate(
        { "FAQ._id": req.body.FAQId },
        { $set: freq },
        { timestamps: false },
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

app.post('/create-FAQ', (req, res) => {
    // res.send('This route will create a new FAQ')
    var freq = {
        question: req.body.question,
        answer: req.body.answer,
        organization : req.body.organization
    };

    orgs.findOneAndUpdate(
        { name: req.body.organization },
        { $push: { FAQ: freq } },
        { timestamps: false },
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

app.delete('/delete-FAQ', (req, res) => {
    // res.send('This route will delete an FAQ')
    orgs.findOneAndUpdate(
        { name: req.body.organization },
        { $pull: { FAQ: { _id: req.body.FAQId } } },
        { timestamps: false },
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

async function getLevelNameByAmount(org, amount) {
    let level = []
    await orgs.find({ name: org })
    .select({ levels: 1 })
    .exec().then((result) => {
            const levels = result[0].levels
            let currLevel = {}

            for (let i = 0; i < levels.length; i++) {
                if (amount <= levels[i].maxAmount && amount >= levels[i].minAmount) {
                    currLevel = levels[i]
                }
                else if (amount >= levels[i].minAmount && !levels[i].maxAmount) {
                    currLevel = levels[i]
                }
            }

            level = currLevel
            
    })

    return level.name

}

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
                let currLevel = {
                    name: "",
                }

                for (let i = 0; i < levels.length; i++) {
                    if (amount <= levels[i].maxAmount && amount >= levels[i].minAmount) {
                        currLevel = levels[i]
                    }
                    else if (amount >= levels[i].minAmount && !levels[i].maxAmount) {
                        currLevel = levels[i]
                    }
                }

                res.json(currLevel)
            }
        })
})

app.put('/update-level', (req, res) => {
    var level = {
        "levels.$.minAmount": req.body.minAmount,
        "levels.$.maxAmount": req.body.maxAmount,
        "levels.$.name": req.body.name,
        "levels.$.color": req.body.color,
        "levels.$.description": req.body.description
    }

    console.log(req.body)

    orgs.findOneAndUpdate(
        { "levels._id": req.body.levelId },
        { $set: level },
        { timestamps: false },
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
        { $push: { levels: level } },
        { timestamps: false },
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
        { $pull: { levels: { _id: req.body.levelId } } },
        { timestamps: false },
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

app.get('/check-event-availability/:id', (req, res) => {
        events.find({_id: req.params.id})
            .exec((err, result) => {
            if (err) {
                console.log("Error on check-event-availability, " + err)
            }
            else {
                if (result[0].spotsTaken >= result[0].totalSpots) {
                    response = false
                    res.send({ cleared: false})
                } else {
                    res.send({ cleared: true})
                }
                // res.send(result)
            }
        }
        )
    
})

app.post('/create-event', async (req, res) => {
    const newEvent = new events({
        name: req.body.name,
        date: req.body.date + 'T06:00:00.000+00:00',
        endDate: (req.body.endDate && req.body.endDate != req.body.date) ? req.body.endDate + 'T06:00:00.000+00:00' : undefined,
        price: req.body.price,
        desc: req.body.desc,
        briefDesc: req.body.briefDesc,
        avgAttendance: req.body.avgAttendance,
        totalSpots: req.body.totalSpots,
        spotsTaken: req.body.spotsTaken,
        visible: req.body.visible,
        org: req.body.org,
        sponsors: []
    })

    newEvent.save((err) => {
        if (err) {
            console.log('Error on create-event: ' + err)
            res.json({ status: '500' })
        }
        else {
            console.log('Created new event')
            res.json({ status: '200' })
        }
    })
})

async function updateEvent(id, eventOptions) {
    let queryStatus = '200'

    if (mongoose.Types.ObjectId.isValid(id)) {
        const event = await events.findOne({ _id: id });
        event.set(eventOptions)
        // console.log(event)

        event.save((err) => {
            if (err) {
                console.log('Error on update-event: ' + err)
                queryStatus = '500'
            }
            else {
                console.log('Successfully updated event\n')
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

app.put('/update-event', (req, res) => {
    const id = req.body.id

    if (!id) {
        console.log('Cannot update event, no id in request body')
        res.json({ status: '400' })
    }
    else {
        const eventOptions = {
            name: req.body.name,
            briefDesc: req.body.briefDesc,
            date: req.body.date + 'T06:00:00.000+00:00',
            endDate: (req.body.endDate && req.body.endDate !== req.body.date) ? req.body.endDate + 'T06:00:00.000+00:00' : undefined,
            price: req.body.price,
            totalSpots: req.body.totalSpots,
            spotsTaken: req.body.spotsTaken,
            avgAttendance: req.body.avgAttendance,
            desc: req.body.desc,
            visible: req.body.visible
        }

        res.json(updateEvent(id, eventOptions))
    }
})

app.put('/reset-events', async(req, res) => {
    let returnStatus = '200'

    const update = await events.updateMany(
        { org: req.body.org, spotsTaken: { $gt : 0 } },
        { $set: { spotsTaken: 0 } }
    )

    // console.log(update.modifiedCount)

    if (!update.acknowledged || update.modifiedCount < 1)
        returnStatus = '400'
    
    res.json({ status: returnStatus })
})

app.delete('/delete-event', async(req, res) => {
    const id = req.body.id

    if (!id) {
        console.log('Cannot delete event, no id in request body')
        res.json({ status: '400' })
    }
    else {
        if (mongoose.Types.ObjectId.isValid(id)) {
            const event = await events.findById(id)
            console.log(event)

            if (event.spotsTaken > 0) {
                console.log('creating zombie event before deleting...')

                const newZombie = new zombieEvents({
                    _id: event._id,
                    name: event.name,
                    date: event.date,
                    endDate: (event.endDate && event.endDate != event.date) ? event.endDate : undefined,
                    price: event.price,
                    briefDesc: event.briefDesc,
                    totalSpots: event.totalSpots,
                    spotsTaken: event.spotsTaken,
                    org: event.org,
                    sponsors: event.sponsors
                })

                console.log(newZombie)
            
                newZombie.save((err) => {
                    if (err) {
                        console.log('Error on delete-event while creating zombie: ' + err)
                        res.json({ status: '500' })
                    }
                    else {
                        console.log('Added event to zombie collection')
                        res.json({ status: '200' })
                    }
                })
            }
            
            /*events.findByIdAndRemove(id, (err, event) => {
                if (err) {
                    console.log('Error on delete-event: ' + err)
                    res.json({ status: '500' })
                }
                else {
                    console.log('Successfully deleted event\n')
                    res.json({ status: '200' })
                }
            })*/
        }
        else {
            console.log('Cannot delete event, invalid id in request body')
            res.json({ status: '400' })
        }
    }
})

app.get('/verify-sponsor-code/:code', (req, res) => {
    // h2kd93n5hs(j

    orgs.find({ sponsorCode: req.params.code })
        .select({ name: 1, shortName: 1 })
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

app.post('/checkout-events', (req, res) => {
    // create new sponsor
    var newSponsor = new sponsors({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        company: req.body.company,
        email: req.body.email,
        sponsorLevel: req.body.sponsorLevel ? req.body.sponsorLevel : 'Not qualified'
    })

    newSponsor.save((err) => {
        if (err) {
            console.log('Error on create sponsor, ' + err)
            res.json({ status: '500' })
        }
        else {
            console.log('New sponsor created, id: ' + newSponsor._id)
        }
    })

    // create a purchase
    const purchase = new purchases({
        sponsorID: newSponsor._id,
        events: req.body.events,
        totalAmount: req.body.totalAmount,
        donationAmount: req.body.donationAmount ? req.body.donationAmount : undefined,
        dateSponsored: Date.now(),
        org: req.body.org
    })

    purchase.save((err) => {
        if (err) {
            console.log('Error on creating a purchase: ' + err)
            res.json({ status: '500' })
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
})

app.get('/get-all-purchased-events/:org', (req, res) => {
    let purchasedEvents = []

    purchases.find({ org: req.params.org })
        .populate("events")
        .populate("sponsorID")
        .exec((err, result) => {
            if (err) {
                console.log("Error on querying events collection in get-all-purchased-events, " + err)
            }

            purchasedEvents = result
            console.log(purchasedEvents)

            purchases.find({ org: req.params.org })
                .populate("zombies")
                .populate("sponsorID")
                .exec((err, result) => {
                    if (err) {
                        console.log("Error on querying zombie collection in get-all-purchased-events, " + err)
                    }

                    console.log("result of zombie query:\n")
                    console.log(result)

                    for (let i = 0; i < result.length; i++) {
                        purchasedEvents.push(result[i])
                    }
                    
                    res.send(purchasedEvents)
                })
        })
})

app.delete('/delete-event-from-purchase', async (req, res) => {

    // Remove event id, decrease total amount of purchase
    await purchases.findOneAndUpdate(
        { _id: req.body.purchaseId },
        { 
            $pull: { events: req.body.eventId},
            $inc: { totalAmount: -1*req.body.eventPrice }
        }
    ).then(console.log("Done")) 

    // Decrement number of spots taken from event
    // Remove sponsor
    await events.findOneAndUpdate(
        { _id: req.body.eventId },
        { 
            $inc: { spotsTaken: -1 },
            $pull: { sponsors: req.body.sponsorId}
        }
    ).then("Dec spots taken & removed sponsor from event")


    // change sponsor level
    var newLevel = await getLevelNameByAmount(req.body.name, req.body.totalAmount-req.body.eventPrice)
    await sponsors.findOneAndUpdate(
        { _id: req.body.sponsorId},
        { sponsorLevel: newLevel }
    ).then(console.log("Updated sponsor level"))
    
    // check if events array from purchase is empty
    await purchases.find({ _id: req.body.purchaseId }, { events: 1 })
        .exec(async(err, result) => {
            if (err) {
                console.log("Error on get-all-sponsors, " + err)
            }
            
            if (result[0].events.length == 0) {

                // remove purchase
                purchases.findByIdAndRemove(req.body.purchaseId, (err, purchase) => {
                    if (err) {
                        console.log('Error on delete-purchase: ' + err)
                        // res.json({ status: '500' })
                    }
                    else {
                        console.log('Successfully deleted purchase: \n' + purchase)
                        // res.json({ status: '200' })
                    }
                })

                // remove sponsor
                sponsors.findByIdAndRemove(req.body.sponsorId, (err, purchase) => {
                    if (err) {
                        console.log('Error on delete-sponsor: ' + err)
                        // res.json({ status: '500' })
                    }
                    else {
                        console.log('Successfully deleted sponsor: \n' + purchase)
                        res.json({ status: '200' })
                    }
                })
            }
        })


})

app.post('/create-sponsor', (req,res) => {
    
    var newSponsor = new sponsors({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        company: req.body.company,
        email: req.body.email,
        sponsorLevel: req.body.sponsorLevel
    });
    newSponsor.save((err) => {
        if (err) console.log("Error on create sponsor, " + err);
        //else it saved
    });
})

app.get('/get-all-sponsors/:org', (req, res) => {
    purchases.find({ org: req.params.org })
        .populate("sponsorID")
        .select({company:1, sponsorLevel:1, totalAmount:1})
        .exec((err, result) => {
            if (err) {
                console.log("Error on get-all-sponsors, " + err)
            }
            
            let sponsors = []
            for (let i = 0; i < result.length; i++) 
            {
                sponsors.push({sponsorLevel:result[i].sponsorID.sponsorLevel, company:result[i].sponsorID.company, totalAmount:result[i].totalAmount, _id:result[i].sponsorID._id})
            }
            res.json(sponsors)
        })
})

app.get('/get-org-info/:org', (req,res) => {
    orgs.find({ name: req.params.org })
        .select({ address: 1, logoImage: 1, fundName: 1, shortName: 1})
        .exec((err, result) => {
            if (err) {
                console.log("Error on get-org-info, " + err)
            }
            else {
                res.json(result[0])
            }
        })
})

app.put('/update-org-info', (req, res) => {
    orgs.findOneAndUpdate(
        { validAdmins: req.body.email },
        { name: req.body.name, fundName: req.body.fundName, address: req.body.address, shortName: req.body.shortName },
        (err, event) => {
            if (err) {
                console.log('Error on update-org-info: ' + err)
                res.json({ status: '500' })
            }
            else {
                console.log('Successfully updated org info: \n' + event)
                res.json({ status: '200' })
            }
        }
    )
})

app.get('/get-org-from-email/:email', (req, res) => {
    let result = { name: "" }

    orgs.find({})
        .then(allOrgs => {
            allOrgs.forEach(org => {
                // console.log(org.validAdmins)
                for (let i = 0; i < org.validAdmins.length; i++) 
                {
                    if (org.validAdmins[i] === req.params.email) 
                    {
                        result = { 
                            name: org.name,
                            shortName: org.shortName,
                            logo: org.logoImage,
                            address: org.address,
                            sponsorCode: org.sponsorCode,
                            fundName: org.fundName,
                            admin: org.admin
                        }

                        // console.log(result)
                        return res.json(result)
                    }
                }
            })
            
            if (result.name === "") {
                res.json(result)
            }
        })
        .catch((err) => {
            console.log("Error finding orgs: " + err)
        })
})

const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@$^&*()';
function generateRandom() {
    let result = '';
    const charactersLength = characters.length;
    for ( let i = 0; i < 12; i++ ) {
        result += characters.charAt(Math.floor(Math.random()  * charactersLength));
    }

    return result
}

app.get('/get-sponsor-code/:org', (req, res) => {
    orgs.find({ name: req.params.org })
        .select({ sponsorCode: 1, updatedAt: 1 })
        .exec((err, result) => {
            if (err) {
                console.log("Error on get-sponsor-code, " + err)
            }
            else {
                res.json(result[0])
            }
        })
})

app.put('/update-sponsor-code', (req, res) => {
    orgs.findOneAndUpdate(
        { name: req.body.org },
        { sponsorCode: generateRandom() },
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


//Setting multer for storing uploaded files
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});
var upload = multer({ storage: storage, 
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg)$/)) { 
           // upload only png and jpg format
           return cb(new Error('Please upload a Image'))
         }
       cb(undefined, true)
    } 
});


app.get('/get-logo/:org', (req,res) => {
    orgs.find({ name: req.params.org })
    .select({logoImage : 1, _id : 0},)
        .exec((err, result) => {
            if (err) {
                //console.log("Error on get-logo, " + err)
                res.send('Error on create-logo')
            }
            else {
                //console.log("Logo url recevied", result[0])
                res.json(result[0])
            }
        })
})

app.post('/create-logo', (req, res) => {
    orgs.findOneAndUpdate(
        { name: req.body.organization },
        { $set: {logoImage: req.body.logoImage}},
        { timestamps: false },
        function (error, success) {
            if (error) {
                //console.log("Error in create-logo", error);
                res.send('Error on create-logo')
            } else {
                res.send("Created logo successfully")    
            }
        }
    );
})


app.get('/get-org', (req,res) => {
    res.send('Get org')
})

function sendGridEmail(toInput, fromInput, subjectInput, messageInput, orgName, shortorgName, orgAddress, total, orgFundName, orgAddress2){
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
        to: toInput, // Change to your recipient
        from: fromInput, // Change to your verified sender
        subject: subjectInput,
        
        
        templateId: 'd-ea66f6a85fef47ceba47c45f55ea34ae',
        dynamicTemplateData: {
            orgName : orgName,
            shortOrgName : shortorgName,
            orgAddress1 : orgAddress,
            items : messageInput, 
            totalCost : "$" + total,
            orgFundName : orgFundName,
            orgAddress2 : orgAddress2
            },
        }
        sgMail
        .send(msg)
        .then((response) => {
            console.log("Email sent")
            console.log(response[0].statusCode)
            console.log(response[0].headers)
        })
        .catch((error) => {
            console.error(error)
        })
}

function sendRequestCreatedEmail(toInput, fromInput, subjectInput, orgName) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
        to: toInput, // Change to your recipient
        from: fromInput, // Change to your verified sender
        subject: subjectInput,
        // text: 'Thank you for your interest in joining Sponsify! We will be in touch with you once your request has been reviewed by the admin team.\n\nBest,\nSponsify Team',
        html: 'Howdy,<br/><br/>Thank you for your interest in joining Sponsify! We will be in touch with you once your request for <strong>' + orgName + '</strong> has been reviewed by the admin team.<br/><br/>Best,<br/>Sponsify Team'
        
        }
        console.log(msg)
        sgMail
        .send(msg)
        .then((response) => {
            console.log("Email sent")
            console.log(response[0].statusCode)
            console.log(response[0].headers)
        })
        .catch((error) => {
            console.error(error.response.body)
        })
}

app.post("/send-checkout-email", (req, res) => {
    const { firstNameInput, lastNameInput, emailInput, cartMessage, subject, student_org_name, orgShortName,orgAddress1, total, orgFundName, orgAddress2 } = req.body
    const name = firstNameInput + " " + lastNameInput;
    sendGridEmail(emailInput,"sabrinapena@tamu.edu",subject,cartMessage,student_org_name,orgShortName,orgAddress1, total, orgFundName, orgAddress2);
})

app.post("/send-request-created-email", (req, res) => {
    console.log(req.body)
    const { email, name } = req.body
    let subject = "Sponsify New User Request - " + name
    sendRequestCreatedEmail(email, "sabrinapena@tamu.edu", subject, name);
})

app.get('/get-requests', (req, res) => {
    requests.find()
    .exec((err, result) => {
        if (err) {
            console.log("Error on get-requests, " + err)
        }
        else {
            res.send(result)
        }
    }
    )
})

app.post('/create-request', (req, res) => {
    const newRequest = new requests({
        name: req.body.name,
        email: req.body.email,
        description: req.body.description
    })

    newRequest.save((err) => {
        if (err) {
            console.log('Error on create-request: ' + err)
            res.json({ status: '500' })
        }
        else {
            console.log('Created new request')
            res.json({ status: '200' })
        }
    })
})

function sendAccessDeniedEmail(toInput, fromInput, subjectInput) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
        to: toInput, // Change to your recipient
        from: fromInput, // Change to your verified sender
        subject: subjectInput,
        // text: 'Thank you for your interest in joining Sponsify! We will be in touch with you once your request has been reviewed by the admin team.\n\nBest,\nSponsify Team',
        html: 'Howdy,<br/><br/>Thank you for taking the time to request using Sponsify. Unfortunately, we will not be able to grant you access at the moment.<br/><br/>Please reach out to our email if you have any questions.<br/><br/>Thanks,<br/>Sponsify Team'
        
        }
        console.log(msg)
        sgMail
        .send(msg)
        .then((response) => {
            console.log("Email sent")
            console.log(response[0].statusCode)
            console.log(response[0].headers)
        })
        .catch((error) => {
            console.error(error.response.body)
        })
}

app.delete('/delete-request', (req, res) => {
    const id = req.body.id

    if (!id) {
        console.log('Cannot delete org request, no id in request body')
        res.json({ status: '400' })
    }
    else {
        if (mongoose.Types.ObjectId.isValid(id)) {
            requests.findByIdAndRemove(id, (err, event) => {
                if (err) {
                    console.log('Error on delete-request: ' + err)
                    res.json({ status: '500' })
                }
                else {
                    console.log('Successfully deleted request: \n' + event)
                    res.json({ status: '200' })
                }
            })

            sendAccessDeniedEmail(req.body.email, "sabrinapena@tamu.edu", "Sponsify Access Denied")

        }
        else {
            console.log('Cannot delete request, invalid id in request body')
            res.json({ status: '400' })
        }
    }
})

function sendAccessGrantedEmail(toInput, fromInput, subjectInput, orgName) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
        to: toInput, // Change to your recipient
        from: fromInput, // Change to your verified sender
        subject: subjectInput,
        // text: 'Thank you for your interest in joining Sponsify! We will be in touch with you once your request has been reviewed by the admin team.\n\nBest,\nSponsify Team',
        html: 'Howdy!<br/><br/>Access has been granted for <strong>' + orgName + '</strong>. Please log in using this same email!<br/><br/>Best,<br/>Sponsify Team'
        
        }
        console.log(msg)
        sgMail
        .send(msg)
        .then((response) => {
            console.log("Email sent")
            console.log(response[0].statusCode)
            console.log(response[0].headers)
        })
        .catch((error) => {
            console.error(error.response.body)
        })
}

app.post("/request-to-org", async (req, res) => {
    const newOrg = new orgs({
        name: "new",
        validAdmins: [req.body.email],
        sponsorCode: generateRandom()
    })

    newOrg.save((err) => {
        if (err) {
            console.log('Error on creating new org: ' + err)
        }
        else {
            console.log('Created new org from request')
        }
    })

    sendAccessGrantedEmail(req.body.email, "sabrinapena@tamu.edu", "Sponsify Access Granted!", req.body.name)
    requests.deleteOne({ _id: req.body.id }).then(console.log("Deleted request"))


})

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

app.listen(port, () => {
    console.log(`App listening on port ${port} :)`)
})
