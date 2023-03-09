const functions = require("firebase-functions");
const express = require("express");
const firebase = require("firebase-admin");
const { V1AuthRouter } = require("./src/routes/v1/auth.routes");
var serviceAccount = require("./assets/serviceAccountKey.json");

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount)
});


const app = express();

app.use(express.json());
app.use("/v1", V1AuthRouter);

exports.auth = functions.region("europe-west1").https.onRequest(app);

exports.app = app;