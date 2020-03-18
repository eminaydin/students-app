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
