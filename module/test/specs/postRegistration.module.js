import request from "supertest";
import { expect } from "chai";


const baseUrl = "https://kasir-api.belajarqa.com";

describe("Create Registration", function () {
  this.timeout(10000);

  it("Positive - Create Registration valid data", async function () {
    const payload = {
      name: "pinkyAja",
      email: "indahsitorus1308@gmail.com",
      password: "12345678",
    };

    const response = await request(baseUrl)
      .post("/registration")
      .send(payload)
      .set("Content-Type", "application/json");

    console.log("Response Body:", response.body); 


    expect(response.status).to.equal(201);
    expect(response.body).to.have.property("status", "success");
  });
});
