const admin = require("firebase-admin");

exports.verifyToken = async (firebaseToken) => {
    return new Promise((resolve, reject) => {
        try {
            admin
                .auth()
                .verifyIdToken(firebaseToken)
                .then(async (decodedToken) => {
                    const user = await admin.auth().getUser(decodedToken.uid);
                    return resolve({ code: 200, userJson: { user: user.toJSON() } })
                })
                .catch((error) => {
                    return resolve({ code: 400, error: error })
                });
        } catch (error) {
            return resolve({ code: 500, error: error })
        }
    })
}