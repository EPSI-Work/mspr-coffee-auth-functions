const { describe, expect, test } = require("@jest/globals");
const request = require("supertest");
//const authController = require("functions/src/controllers/v1/auth.controller");
const { app } = require("functions/index.js");

//echo the path to the test file

describe("V1SignInWithEmail", () => {
    //plus bon à cause du token
    it("should return a success message when the email parameter is given.", async() => {
        const email = "test@test.com";
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

    it("should return a success message when the email is send.", async() => {
        const response = await request(app).post("/v1/signInWithEmail").send({
            email: "test@test.com",
        });
        expect(response.status).toBe(200);
    }, 6000);

    //validate Token
    it("should return an error message when the token is not given.", async() => {
        const response = await request(app).get("/v1/validateQrCode");
        expect(response.status).toBe(400);
        expect(response.body.errors).toContainEqual({
            msg: "Token is required.",
            param: "firebaseToken",
            location: "query",
        });
    }, 6000);
    it("should return an error message when before send a qrcode a token is given but not a good one.", async() => {
        const response = await request(app).get(
            "/v1/validateQrCode?firebaseToken=bonjour"
        );
        expect(response.status).toBe(400);
        expect(response.body.errors).toContainEqual({
            msg: "Invalid Firebase token",
            param: "firebaseToken",
            location: "query",
            value: "bonjour",
        });
    }, 6000);
    it("should return an error message when before talk with rust a token is given but not a good one.", async() => {
        const response = await request(app).post("/v1/verifyToken").send({
            firebaseToken: "bonjour",
        });
        expect(response.status).toBe(400);
    }, 6000);
});