const express = require('express')
const nodemailer = require('nodemailer')
const cors = require('cors')
const bodyParser = require('body-parser')


const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

const port = process.env.PORT || 3000
const smtp_login = process.env.SMTP_LOGIN
const smtp_password = process.env.SMTP_PASSWORD
const smtp_receivers_email = process.env.SMTP_RECEIVERS_EMAIL

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: smtp_login,
        pass: smtp_password
    }
})

app.post('/', async function (req, res) {
    const {name, email, subject, message} = req.body
    const mailOptions = {
        from: name, // sender address
        to: smtp_receivers_email, // list of receivers
        subject: subject, // Subject line
        html: `<h1>New message from HR!</h1>
<div>You have new message from ${email}: ${message}</div>`// plain text body
    };

    await transporter.sendMail(mailOptions);
})
app.get('/', function (req, res) {
    res.send('Hello world!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})