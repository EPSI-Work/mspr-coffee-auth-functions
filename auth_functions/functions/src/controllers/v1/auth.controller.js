const { validationResult } = require("express-validator");
const { auth } = require("firebase-admin");
const nodemailer = require("nodemailer");
const qrcode = require("qrcode")
require('dotenv').config()

//This function check if the user is already registered in firebase auth. Then it send an email to the user with a link to validate the email address.
exports.V1SignInWithEmail = async (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }
    const { email } = request.body;
    const user = await auth().getUserByEmail(email);
    const token = await auth().createCustomToken(user.uid);
    const url = `https://${process.env.domain}/api/v1/auth/validateQrCode?token=${token}`;

    if (!user) {
        return response.status(400).json({
            message: "User not found",
        });
    }

    let transporter = nodemailer.createTransport({
        host: "smtp-mail.outlook.com",
        secureConnection: false,
        port: 587,
        tls: {
            ciphers: "SSLv3"
        },
        auth: {
            user: '',
            pass: '',
        },
    });

    let mailOptions = {
        from: '', // sender address
        to: "nicolas.huon@epsi.fr", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: `<b>Hello world?</b> cc ${email}  voici votre url de redirection: ${url}`, // html body
        attachments: [{
            filename: 'qrcode.png',
            path: './qrcode.png',
            cid: 'qrcode'
        }]
    }

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (err, info) => {
        if (err)
            return response.status(400).json({
                message: err,
            });
        return response.status(200).json({
            message: "Sign in with email",
        });
    });
    console.log(token)
    //console.log(await auth().verifyIdToken(token))
};

exports.V1ValidateQrCode = async (request, response) => {
    qrcode.toFile('qrcode.png', url, (err) => {
        if (err) return response.status(400).json({
            message: "Qrcode didn't created"
        });
    });

    response.write(qrcode);
    return response.status(200).json({
        message: "Validate QR code",
    });
};