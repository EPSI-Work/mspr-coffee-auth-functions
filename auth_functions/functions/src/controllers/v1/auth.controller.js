const { validationResult } = require("express-validator");
const { auth } = require("firebase-admin");

const qrcode = require("qrcode");
require("dotenv").config();
const functions = require("firebase-functions");
const { verifyToken } = require("../../services/FirebaseToken");
const { MailService } = require("../../services/mail.service");

//This function check if the user is already registered in firebase auth. Then it send an email to the user with a link to validate the email address.
exports.V1SignInWithEmail = async(request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }
    const { email } = request.body;
    const user = await auth().getUserByEmail(email);
    const firebaseToken = await auth().createCustomToken(user.uid);
    console.log(firebaseToken);
    const url = `${
    functions.config().app.base_url
  }/v1/auth/validateQrCode?firebaseToken=${firebaseToken}`;

    if (!user) {
        return response.status(400).json({
            message: "User not found",
        });
    }
    const mailService = new MailService();
    const mailOptions = {
        from: functions.config().app.email_from,
        to: "baptiste.lecat44@gmail.com",
        subject: "Hello ✔",
        text: "Hello world?",
        html: `<b>Hello world?</b> Bonjour ${email} voici votre url de redirection afin de scanner votre qrcode: ${url}`,
    };
    await mailService
        .sendMail(mailOptions)
        .then((res) => {
            return response.status(200).json({
                message: "Sign in with email",
            });
        })
        .catch((err) => {
            return response.status(400).json({
                message: err,
            });
        });
};

exports.V1ValidateQrCode = async(request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }
    const { firebaseToken } = request.query;
    qrcode.toFile("qrcode.png", firebaseToken, (err) => {
        if (err)
            return response.status(400).json({
                message: "Qrcode didn't created",
            });
    });
    response.write("cc");
    return response.status(210).json({
        message: "Validate QR code",
    });
};

exports.V1VerifyFirebaseToken = functions
    .region("europe-west1")
    .https.onRequest(async(request, response) => {
        //renvoi vers checktoken
        const firebaseToken = request.body.firebaseToken;
        const answer = await verifyToken(firebaseToken);
        if (answer.code === 200) response.status(200).send(answer.userJson);
        response.status(answer.code).send(answer.error);
    });