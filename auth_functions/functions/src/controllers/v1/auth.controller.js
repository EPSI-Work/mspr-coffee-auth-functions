const { validationResult } = require("express-validator");
const { auth } = require("firebase-admin");

//This function check if the user is already registered in firebase auth. Then it send an email to the user with a link to validate the email address.
exports.V1SignInWithEmail = async(request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }
    const { email } = request.body;
    const user = await auth().getUserByEmail(email);
    if (!user) {
        return response.status(400).json({
            message: "User not found",
        });
    }
    return response.status(200).json({
        message: "Sign in with email",
    });
};

exports.V1ValidateQrCode = async(request, response) => {
    return response.status(200).json({
        message: "Validate QR code",
    });
};