exports.V1SignInWithEmail = async(request, response) => {
    response.send({
        message: "Sign in with email",
    });
};

exports.V1ValidateQrCode = async(request, response) => {
    response.send({
        message: "Validate QR Code",
    });
};