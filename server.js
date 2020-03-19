const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
var port = process.env.PORT || 3000;
const app = express();
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

app.listen(port, function() {
    console.log("The server started on port 3000 !!!!!!");
});

app.get("/", (req, res) => {
    res.send(
        "<h1 style='text-align: center'>Welcome!</h1>"
    );
});

app.post("/", (req, res) => {
    let user = req.body;
    sendMail(user, info => {
        res.send(info);
    });
});

async function sendMail(user, callback) {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'phamminhphueur@gmail.com', //don't include the {{ }}
            pass: 'nedxrwalbvbrzskx'
        }
    });

    let mailOptions = {
        from: 'phamminhphueur@gmail.com', // sender address
        to: 'phamminhphueur@gmail.com', // list of receivers
        subject: "Contact Form", // Subject line
        html: `<p>${user.fullname}</p><p>${user.phonenumber}</p>
    <p>${user.emailAdd}</p><br><p>${user.messageText}</p><br>`
    };

    // send mail with defined transport object
    let info = await transporter.sendMail(mailOptions);

    callback(info);
}