const request = require("supertest");
const app = require("../app");

describe("Testing POST api/students", () => {
  test("Content-Type -> JSON", async () => {
    const newStudent = await request(app)
      .post("/api/students")
      .send({
        name: "TestName",
        lastname: "TestLastName",
        age: 22,
        class: "FBW101",
        location: "BER"
      });
    expect.objectContaining({
      headers: expect.objectContaining({ "Content-Type": "application/json" })
    });
    expect(newStudent.statusCode).toBe(200);
    const response = await request(app).get("/api/students/TestName");
    expect(response.body).toEqual(
      expect.objectContaining({
        name: "TestName",
        lastname: "TestLastName",
        age: 22,
        class: "FBW101",
        location: "BER"
      })
    );
  });
});
