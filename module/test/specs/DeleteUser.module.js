import request from "supertest";
import { expect } from "chai";
import { baseUrl } from "../../data/config.js";

describe("Delete User", function () {
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

    it("Positive - Delete specific user", async function () {
        const userId = "05a04e78-8307-4b9f-8f08-c757f12ba29b"; 

        const response = await request(baseUrl)
            .delete(`/users/${userId}`) 
            .set("Authorization", `Bearer ${token}`)
            .set("Content-Type", "application/json");

        console.log("Response Body:", JSON.stringify(response.body, null, 2));

        expect(response.status).to.equal(200);
        expect(response.body.status).to.equal("success");
        expect(response.body.message).to.equal("User berhasil dihapus");
    });
});
