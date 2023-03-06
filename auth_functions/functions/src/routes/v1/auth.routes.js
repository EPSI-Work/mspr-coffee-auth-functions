const {
    V1SignInWithEmail,
    V1ValidateQrCode,
} = require("../../controllers/v1/auth.controller");
const { Router } = require("express");

const V1AuthRouter = Router();

V1AuthRouter.get("/signInWithEmail", V1SignInWithEmail);
V1AuthRouter.get("/validateQrCode", V1ValidateQrCode);

exports.V1AuthRouter = V1AuthRouter;