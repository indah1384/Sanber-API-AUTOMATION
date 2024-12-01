import request from "supertest";
import { expect } from "chai";
import { baseUrl } from "../../data/config.js";

describe("Create user", function () {
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

    it("Positive - Create user with valid data", async function () {
        const payload = {
            "name": "pinkyAja",
            "email": "indahsitorus1384@gmail.com",
            "password": "12345678",
        };

        const response = await request(baseUrl)
            .post("/users")
            .send(payload)
            .set("Content-Type", "application/json")
            .set("Authorization", `Bearer ${token}`); // Menggunakan token yang sudah didapat

        console.log("Response Body:", response.body);

        expect(response.status).to.equal(201); // Memastikan status 201 (Created)
        expect(response.body).to.have.property("status", "success");
    });
});
