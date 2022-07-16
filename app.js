const express = require('express')
const bodyParser = require('body-parser')
var cors = require('cors')

const DbService = require('./dbService')


const app = express()

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(bodyParser.json())

app.use(cors())
//  Create a feedback 
app.post('/addFeedback', (req, res) => {
    const { head, body, tags } = req.body
    const db = DbService.getDbServiceInstance()

    const tag = tags.join(',')
    console.log(head, body, tag)


    const result = db.addFeedback(head, body, tag)

    result
        .then(data => res.json(data))
        .catch((err) => console.log(err))

})
//Sign up
app.post('/signUp', (req, res) => {
    const { email, password } = req.body
    const db = DbService.getDbServiceInstance()

    const emailArr = email.split('@')

    if (emailArr[1] === 'st.ug.edu.gh') {

        const result = db.signUp(email, password)

        return result
            .then(data => res.json({ data: data }))
            .catch((err) => console.log(err))
    } else {
        return res.status(400).send('Please Input a student mail')
    }

})

//Sign In
app.post('/signIn', (req, res) => {
    const { email, password } = req.body

    const db = DbService.getDbServiceInstance()

    const result = db.signIn(email, password)

    result
        .then(data => res.json({ user: data }))
        .catch((err) => console.log(err))

})

// Get feedBacks 
app.get('/getFeedbacks', (request, response) => {
    const db = DbService.getDbServiceInstance()

    const result = db.getFeedbacks()

    result
        .then(data => response.json({ data: data }))
        .catch((err) => console.log(err))
})

// get Feedback With Index 
app.get('/feedback', (req, res) => {
    const id = req.query.id
    const db = DbService.getDbServiceInstance()

    const result = db.feedback(id)

    result
        .then(data => res.json({ data: data }))
        .catch((err) => console.log(err))

})

// Add Feedback Comment

app.post('/addComment', (req, res) => {
    const { body, id } = req.body
    const db = DbService.getDbServiceInstance()

    const result = db.addComment(body, id)

    result
        .then(data => res.json({ data: data }))
        .catch((err) => console.log(err))

})

// Edit feedback 

app.post('/editFeedback', (req, res) => {
    const { head, body, tags, id } = req.body
    const db = DbService.getDbServiceInstance()

    const tag = tags.join(',')
    console.log(head, body, tag)


    const result = db.editFeedback(head, body, tags, id)

    result
        .then(data => res.json({ data: data }))
        .catch((err) => console.log(err))

})

// app.get


app.listen(5000, () => {
    console.log('Im running')
})