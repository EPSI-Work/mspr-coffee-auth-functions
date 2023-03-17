const { validationResult } = require("express-validator");
const { auth } = require("firebase-admin");

const qrcode = require("qrcode");
require("dotenv").config();
const functions = require("firebase-functions");
const { verifyToken } = require("../../Services/FirebaseToken.js");
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
    const url = `${
    functions.config().app.base_url
  }/v1/validateQrCode?firebaseToken=${firebaseToken}`;

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
        html: `<b>Hello world?</b><br>Bonjour ${
      user.displayName != undefined || user.displayName != null
        ? user.displayName
        : user.email
    } voici le lien vers votre QRCode: ${url}`,
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
    // Generate the QR code data URL
    const dataUrl = await qrcode.toDataURL(firebaseToken);
    // Set the response headers
    response.setHeader("Content-Type", "image/png");
    response.setHeader("Content-Disposition", "inline; filename=qr.png");
    // Write the image data to the response stream
    const imageData = dataUrl.replace(/^data:image\/png;base64,/, "");
    const imageBuffer = Buffer.from(imageData, "base64");
    response.send(imageBuffer);
};