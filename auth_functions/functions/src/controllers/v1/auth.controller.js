//This function check if the user is already registered in firebase auth. Then it send an email to the user with a link to validate the email address.
exports.V1SignInWithEmail = async(request, response) => {
    const { email } = request.body;
    if (!email) {
        return response.status(400).json({
            message: "Email is required",
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