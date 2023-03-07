const functions = require("firebase-functions");
const express = require("express");
const firebase = require("firebase-admin");
const { V1AuthRouter } = require("./src/routes/v1/auth.routes");

firebase.initializeApp();

const app = express();

app.use(express.json());
app.use("/auth/v1", V1AuthRouter);

exports.api = functions.region("europe-west1").https.onRequest(app);

exports.app = app;