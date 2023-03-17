const { describe, expect, test } = require("@jest/globals");
const request = require("supertest");
const authController = require("functions/src/controllers/v1/auth.controller");
const { app } = require("functions/index.js");

//echo the path to the test file

describe("V1SignInWithEmail", () => {
    it("should return a success message when the email parameter is given.", async() => {
        const email = "test@gmail.com";
        const response = await request(app)
            .post("/v1/signInWithEmail")
            .send({ email: email });
        expect(response.status).toBe(200);
    }, 6000);

    it("should return an error when the email parameter is missing.", async() => {
        const response = await request(app).post("/v1/signInWithEmail").send({});
        expect(response.status).toBe(400);
    }, 6000);

    it("should return an error when the email parameter is not a valid email.", async() => {
        const response = await request(app).post("/v1/signInWithEmail").send({
            email: "test",
        });
        expect(response.status).toBe(400);
    }, 6000);

    it("should return an error when the email given doesn't exist.", async() => {
        const response = await request(app).post("/v1/signInWithEmail").send({
            email: "testnotexist@gmail.com",
        });
        expect(response.status).toBe(400);
    }, 6000);

    it("should return a success message when the email is send.", async() => {
        const response = await request(app).post("/v1/signInWithEmail").send({
            email: "test@gmail.com",
        });
        expect(response.status).toBe(200);
    }, 6000);
});

describe("V1ValidateQrCode", () => {
    it("should return an error message if the token is invalid.", async() => {
        let token = "bonjour";
        const response = await request(app).get(
            `/v1/validateQrCode?firebaseToken=${token}`
        );
        expect(response.status).toBe(400);
    }, 6000);

    it("should return a success message if the token is valid (for the test we don't care about the expiration).", async() => {
        let token =
            "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL2lkZW50aXR5dG9vbGtpdC5nb29nbGVhcGlzLmNvbS9nb29nbGUuaWRlbnRpdHkuaWRlbnRpdHl0b29sa2l0LnYxLklkZW50aXR5VG9vbGtpdCIsImlhdCI6MTY3OTA3MDc5NCwiZXhwIjoxNjc5MDc0Mzk0LCJpc3MiOiJtc3ByLWVwc2ktY29mZmVlQGFwcHNwb3QuZ3NlcnZpY2VhY2NvdW50LmNvbSIsInN1YiI6Im1zcHItZXBzaS1jb2ZmZWVAYXBwc3BvdC5nc2VydmljZWFjY291bnQuY29tIiwidWlkIjoicGIwbDZFejc0cFF5R0JKVnR0YzZOSnFHaGpBMyJ9.ZVy89T3vqElhunnnLJpVEwP5ETtJUcmFe4eNDIxUtZ10ciCb-t8fxvDFkFjAezoqIVpAUm3QT8Ofu0HLXKChUxmC8onU6EH38Kaq045xhkv_9rEMxXKPkflQWYNkzkGX6R7wJoSysLT5ue0XgRAOdeO2uMbx9fSjNHBTXLu5QJxB7Dnt2EKBkNEkBMh3eYfy9iGvFeNDxBeZ_wlc-HLtoGIsiFGPuhWrlgzkwivnpGZK4dLbO5W6-G8wTKDk7RM4S_jF8OKVtgRinaVaAIoOVekeZjN0uG2HA5Zd_XfQDiQ3BuK_u5K94UCzxAvrWBsAqgOcejs1SKaRiruQHV6E1g";
        const response = await request(app).get(
            `/v1/validateQrCode?firebaseToken=${token}`
        );
        //On souhaite vérifier que le status code est 200 ou 400 mais avec un body qui contient msg: "Invalid Firebase token"
        if (response.status === 400) {
            expect(response.body.errors[0].msg.reason).toBe("jwt expired");
        } else {
            expect(response.status).toBe(200);
        }
    }, 6000);
});