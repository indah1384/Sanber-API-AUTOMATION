import request from "supertest";
import { expect } from "chai";
import { baseUrl } from "../../data/config.js";

describe("Get All Users", function () {
    this.timeout(10000);

    let token;

    before(async function () {
        // Mendapatkan token dari POST /authentications
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

    it("Positive - Get all users", async function () {
        const response = await request(baseUrl)
            .get("/users") 
            .set("Authorization", `Bearer ${token}`) 
            .set("Content-Type", "application/json");


        console.log("Response Body:", JSON.stringify(response.body, null, 2)); 


        expect(response.status).to.equal(200); 
        expect(response.body).to.have.property("data");
        expect(response.body.data).to.have.property("users").that.is.an("array");
        expect(response.body.data.users.length).to.be.greaterThan(0);
    });
});
