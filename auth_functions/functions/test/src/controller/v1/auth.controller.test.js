const { describe, expect, test } = require("@jest/globals");
const request = require("supertest");
const authController = require("functions/src/controllers/v1/auth.controller");
const { app } = require("functions/index.js");

//echo the path to the test file

//Start the express app
app.listen(3000, () => {});

describe("V1SignInWithEmail", () => {
    it("should return a message when given an email address", async() => {
        const email = "test@test.com";
        const response = await request(app)
            .post("/auth/v1/signInWithEmail")
            .send({ email });
        expect(response.status).toBe(200);
    });
});