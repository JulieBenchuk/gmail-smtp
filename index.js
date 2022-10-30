const express = require('express')
const nodemailer = require('nodemailer')
const cors = require('cors')


const app = express()
app.use(cors())

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

app.get('/', async function (req, res) {

    const mailOptions = {
        from: 'Message from HR!', // sender address
        to: smtp_receivers_email, // list of receivers
        subject: 'Message from HR!', // Subject line
        html: '<h1>this is a test mail.</h1>'// plain text body
    };

    await transporter.sendMail(mailOptions);
    res.send("Hello World!")
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})