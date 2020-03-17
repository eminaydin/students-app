const request = require("supertest");
const app = require("../app");

describe("Testing GET api/students", () => {
  test("Content-Type -> JSON", async () => {
    const response = await request(app).get("/api/students");
    expect.objectContaining({
      headers: expect.objectContaining({ "Content-Type": "application/json" })
    });
  });
  test("It should respond with status code -> 200", async () => {
    const response = await request(app).get("/api/students");
    expect(response.statusCode).toBe(200);
  });
  test("Content is an array", async () => {
    const response = await request(app).get("/api/students");
    expect(Array.isArray(response.body)).toBe(true);
  });
});
