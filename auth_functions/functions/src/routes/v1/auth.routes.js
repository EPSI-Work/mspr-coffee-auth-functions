const {
    V1SignInWithEmail,
    V1ValidateQrCode,
    V1VerifyFirebaseToken,
} = require("../../controllers/v1/auth.controller");
const { Router } = require("express");
const { body, query } = require("express-validator");
const { verifyToken } = require("../../Services/FirebaseToken.js");

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

V1AuthRouter.get(
    "/validateQrCode",
    query("firebaseToken")
    .exists()
    .withMessage("Token is required.")
    .notEmpty()
    .withMessage("Token cannot be empty.")
    .custom(async(firebaseToken) => {
        return await verifyToken(firebaseToken).catch((err) => {
            return Promise.reject(err.message);
        });
    }),
    V1ValidateQrCode
);

exports.V1AuthRouter = V1AuthRouter;