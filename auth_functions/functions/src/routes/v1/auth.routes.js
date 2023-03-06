const {
    V1SignInWithEmail,
    V1ValidateQrCode,
} = require("../../controllers/v1/auth.controller");
const { Router } = require("express");
const { body } = require("express-validator");

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
V1AuthRouter.post("/validateQrCode", V1ValidateQrCode);

exports.V1AuthRouter = V1AuthRouter;