const NodeRSA = require("node-rsa");
const jwt = require("jsonwebtoken");

exports.verifyToken = async(firebaseToken) => {
    return new Promise(async(resolve, reject) => {
        //Get the private key from the service account json file
        const serviceAccount = require("../../assets/service-account.json");
        const privateKey = serviceAccount.private_key;
        const publicKey = new NodeRSA(privateKey.toString("utf8")).exportKey(
            "pkcs8-public-pem"
        );

        jwt.verify(
            firebaseToken,
            publicKey, {
                algorithms: ["RS256"],
            },
            (err, decoded) => {
                if (err) {
                    console.log(err.message);
                    reject({
                        code: 401,
                        message: "Invalid Firebase token",
                        reason: err.message,
                    });
                } else {
                    resolve({
                        code: 200,
                        message: "Valid Firebase token",
                        uid: decoded.uid,
                    });
                }
            }
        );
    });
};