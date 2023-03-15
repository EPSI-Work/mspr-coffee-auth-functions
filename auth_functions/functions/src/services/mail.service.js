const nodemailer = require("nodemailer");
require("dotenv").config();
const functions = require("firebase-functions");

exports.MailService = class MailService {
    constructor(transporter) {
        this.transporter = nodemailer.createTransport({
            host: functions.config().app.email_host,
            secureConnection: false,
            port: 587,
            auth: {
                user: functions.config().app.email_username,
                pass: functions.config().app.email_password,
            },
        });
    }
    async sendMail(mailOptions) {
        return new Promise((resolve, reject) => {
            // send mail with defined transport object
            this.transporter.sendMail(mailOptions, (err, info) => {
                if (err) return reject(err);
                return resolve("SignIn");
            });
        });
    }
};