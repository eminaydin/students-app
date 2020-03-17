const request = require("supertest");
const app = require("../app");

describe("Testing GET api/students", () => {
  test("It should respond with status code -> 200, Content-Type -> JSON, Content is an array", async () => {
    const response = await request(app).get("/api/students");
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(1);
    expect(response.body[0]).toHaveProperty("name");
    expect(response.statusCode).toBe(200);
  });
});
