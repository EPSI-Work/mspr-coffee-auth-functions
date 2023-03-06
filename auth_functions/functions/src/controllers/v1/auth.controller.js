const { validationResult } = require("express-validator");

//This function check if the user is already registered in firebase auth. Then it send an email to the user with a link to validate the email address.
exports.V1SignInWithEmail = async(request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }
    const { email } = request.body;
    return response.status(200).json({
        message: "Sign in with email",
    });
};

exports.V1ValidateQrCode = async(request, response) => {
    return response.status(200).json({
        message: "Validate QR code",
    });
};