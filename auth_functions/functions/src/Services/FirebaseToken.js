const http = require("http");
const functions = require("firebase-functions");
const NodeRSA = require("node-rsa");
const jwt = require("jsonwebtoken");
const { GoogleAuth } = require("google-auth-library");
const admin = require("firebase-admin");

exports.verifyToken = async(firebaseToken) => {
    return new Promise(async(resolve, reject) => {
        //Get the private key from the service account json file
        const serviceAccount = require("../../assets/service-account.json");
        const privateKey = serviceAccount.private_key;
        const publicKey = new NodeRSA(privateKey.toString("utf8")).exportKey(
            "pkcs8-public-pem"
        );

        jwt.verify(
            firebaseToken,
            publicKey, {
                algorithms: ["RS256"],
            },
            (err, decoded) => {
                if (err) {
                    reject("Token is invalid!");
                } else {
                    resolve(decoded.uid);
                }
            }
        );
    });
};