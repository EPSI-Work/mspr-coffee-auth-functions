const { describe, expect, test } = require("@jest/globals");
const request = require("supertest");
const authController = require("functions/src/controllers/v1/auth.controller");
const { app } = require("functions/index.js");

//echo the path to the test file

describe("V1SignInWithEmail", () => {
    it("should return a success message when the email parameter is given.", async() => {
        const email = "test@test.com";
        const response = await request(app)
            .post("/auth/v1/signInWithEmail")
            .send({ email: email });
        expect(response.status).toBe(200);
    }, 6000);

    it("should return an error when the email parameter is missing.", async() => {
        const response = await request(app)
            .post("/auth/v1/signInWithEmail")
            .send({});
        expect(response.status).toBe(400);
    }, 6000);

    it("should return an error when the email parameter is not a valid email.", async() => {
        const response = await request(app).post("/auth/v1/signInWithEmail").send({
            email: "test",
        });
        expect(response.status).toBe(400);
    }, 6000);

    it("should return an error when the email given doesn't exist in the database.", async() => {
        const response = await request(app).post("/auth/v1/signInWithEmail").send({
            email: "test",
        });
        expect(response.status).toBe(400);
    }, 6000);
});