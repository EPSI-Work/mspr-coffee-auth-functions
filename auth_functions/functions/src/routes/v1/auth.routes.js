const {
    V1SignInWithEmail,
    V1ValidateQrCode,
    V1VerifyFirebaseToken,
} = require("../../controllers/v1/auth.controller");
const { Router } = require("express");
const { body, query } = require("express-validator");
const { verifyToken } = require("../../services/FirebaseToken.js");

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
        const answer = await verifyToken(firebaseToken);
        if (answer.code !== 200) throw new Error("Invalid Firebase token");
    }),
    V1ValidateQrCode
);

V1AuthRouter.post(
    "/verifyToken",
    body("firebaseToken").exists().withMessage("Firebase Token is required"),
    V1VerifyFirebaseToken
);

V1AuthRouter.post(
    "/verifyToken",
    body("firebaseToken").exists().withMessage("Firebase Token is required"),
    V1VerifyFirebaseToken
);

exports.V1AuthRouter = V1AuthRouter;