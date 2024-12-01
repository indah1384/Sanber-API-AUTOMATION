import request from "supertest";
import { expect } from "chai";
import { baseUrl } from "../../data/config.js";

describe("Update User", function () {
    this.timeout(10000);

    let token;

    before(async function () {
        const payload = {
            "email": "indah1234@sitorus.com",
            "password": "123456",
        };

        const authResponse = await request(baseUrl)
            .post("/authentications")
            .send(payload)
            .set("Content-Type", "application/json");

        token = authResponse.body.data.accessToken;
        console.log("Token:", token);
    });

    it("Positive - Update user information", async function () {
        const userId = "69d88fb5-668f-4642-bca7-53a6d1342e3e"; // Gantilah dengan user ID yang tepat
        const updatedPayload = {
            name: "pinky sitorus",
            email: "pinky123@gmail.com",
        };

        const response = await request(baseUrl)
            .put(`/users/${userId}`)
            .send(updatedPayload)
            .set("Authorization", `Bearer ${token}`)
            .set("Content-Type", "application/json");

        console.log("Response Body:", JSON.stringify(response.body, null, 2));

        expect(response.status).to.equal(200);
        expect(response.body.data).to.have.property("name", "pinky sitorus");
        
    });
});
