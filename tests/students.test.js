const request = require("supertest");
const app = require("../app");

function isObject(item) {
  return typeof item === "object" && !Array.isArray(item) && item !== null;
}

describe("Testing GET api/students/:name", () => {
  test("Content-Type -> JSON", async () => {
    const response = await request(app).get("/api/students/Rupert");
    expect.objectContaining({
      headers: expect.objectContaining({ "Content-Type": "application/json" })
    });
  });
  test("It should respond with status code -> 200", async () => {
    const response = await request(app).get("/api/students/Rupert");
    expect(response.statusCode).toBe(200);
  });
  test("Content is an Object", async () => {
    const response = await request(app).get("/api/students/Rupert");
    expect(isObject(response.body)).toBe(true);
  });
});
