import request from "supertest"
import { baseUrl } from "../../data/config.js"

export async function CreateToken() {
    const payload = {
    "email": "indah1234@sitorus.com",
    "password": "123456",
    }

    const response = await request(baseUrl)
      .post("/authentications")
      .send(payload)
      .set("Content-Type", "application/json");

      const token = (await response).body.token
      return token
}