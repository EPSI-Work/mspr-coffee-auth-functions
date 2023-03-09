const nodemailer = require("nodemailer");
require("dotenv").config();


exports.Mail = class Mail {
    constructor(transporter) {
        this.transporter = nodemailer.createTransport({
            host: "smtp-mail.outlook.com",
            secureConnection: false,
            port: 587,
            tls: {
                ciphers: "SSLv3",
            },
            auth: {
                user: process.env.from,
                pass: process.env.passwd,
            },
        });
    }
    async sendMail(mailOptions) {
        return new Promise((resolve, reject) => {
            // send mail with defined transport object
            this.transporter.sendMail(mailOptions, (err, info) => {
                if (err)
                    return reject(err);
                return resolve("SignIn");

            })
        })
    }
}