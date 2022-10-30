const express = require('express')
const nodemailer = require('nodemailer')
const cors = require('cors')


const app = express()
app.use(cors())
const port = 3000

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'testaccbenchuk@gmail.com',
        pass: 'ytprqyzouxikpzwz'
    }
})

app.get('/', async function (req, res) {

    const mailOptions = {
        from: 'Message from HR!', // sender address
        to: 'juliebenchuk@gmail.com', // list of receivers
        subject: 'Message from HR!', // Subject line
        html: '<h1>this is a test mail.</h1>'// plain text body
    };

    await transporter.sendMail(mailOptions);
    res.send("Hello World!")
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})