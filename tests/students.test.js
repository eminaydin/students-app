const request = require("supertest");
const app = require("../app");

describe("Testing DELETE request on api/students", () => {
  test("Post new Student, DELETE new student", async () => {
    const newStudent = await request(app)
      .post("/api/students")
      .send({
        name: "TestName",
        lastname: "TestLastName",
        age: 22,
        class: "FBW101",
        location: "BER"
      });
    const removedStudent = await request(app).delete(`/api/students/${newStudent.body.name}`);
    expect(removedStudent.statusCode).toBe(200);
  });
  test("GET updated students aray", async () => {
    const response = await request(app).get(`/api/students`);
    expect(response.body.length).toBe(1);
  });
});

describe("Testing GET api/students", () => {
  test("Content-Type -> JSON", async () => {
    const response = await request(app).get("/api/students");
    const expectedCase = "application/json; charset=utf-8";

    expect(response.headers["content-type"]).toBe(expectedCase);
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
