const {
    V1SignInWithEmail,
    V1ValidateQrCode,
} = require("../../controllers/v1/auth.controller");
const { Router } = require("express");
const { body, query } = require("express-validator");
const { auth } = require("firebase-admin");

const V1AuthRouter = Router();

V1AuthRouter.post(
    "/signInWithEmail",
    body("email")
        .exists()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Email is not valid"),
    V1SignInWithEmail
);

V1AuthRouter.get("/validateQrCode", query("token").exists().withMessage("TokenNotExist").custom(token => {
    // firebaseadminsdk et que je vérifie si il 

}), V1ValidateQrCode);

exports.V1AuthRouter = V1AuthRouter;