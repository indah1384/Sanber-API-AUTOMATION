import request from "supertest";
import { expect } from "chai";

// Base URL langsung didefinisikan
const baseUrl = "http://kasiraja-kasir-6d14e7-776927-46-250-233-198.traefik.me";

describe("Create Authentication", () => {
    
  it("Positive - Create authentication with valid data", async () => {
    const payload = {
      "email": "indah1234@sitorus.com",
      "password": "123456",
    };

    // Gunakan langsung baseUrl
    const response = await request(baseUrl)
      .post("/authentications")
      .send(payload)
      .set("Content-Type", "application/json");

    console.log("Response Body:", response.body);

    expect(response.status).to.equal(201);
    expect(response.body).to.have.property("status", "success");
  });
});
