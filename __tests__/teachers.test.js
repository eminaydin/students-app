const request = require("supertest");
const app = require("../app");
const { db } = require("../data/db");
const { teachers: teachersDefaultsTemplate } = require("../data/defaults");

function isObject(item) {
  return typeof item === "object" && !Array.isArray(item) && item !== null;
}

afterEach(() => {
  const teachersDefaults = [...teachersDefaultsTemplate];

  db.set("teachers", teachersDefaults).write();
});

describe("Testing GET api/teachers", () => {
  test("Content-Type -> JSON", async () => {
    const response = await request(app).get("/api/teachers");
    const expectedCase = "application/json; charset=utf-8";

    expect(response.headers["content-type"]).toBe(expectedCase);
  });

  test("It should respond with status code -> 200", async () => {
    const response = await request(app).get("/api/teachers");
    expect(response.statusCode).toBe(200);
  });

  test("Content is an array", async () => {
    const response = await request(app).get("/api/teachers");
    expect(Array.isArray(response.body)).toBe(true);
  });
});

describe("Testing DELETE request on api/teachers", () => {
  test("Post new teacher, DELETE new teacher", async () => {
    const newTeacher = await request(app).post("/api/teachers").send({
      name: "TestName",
      lastname: "TestLastName",
      age: 22,
      class: "FBW21",
      location: "BER",
    });
    const removedTeacher = await request(app).delete(
      `/api/teachers/${newTeacher.body.name}`
    );
    expect(removedTeacher.statusCode).toBe(200);
  });
  test("GET updated teachers aray", async () => {
    const response = await request(app).get(`/api/teachers/TestName`);
    expect(response.body).toEqual({ error: "Teacher Not Found" });
  });
});

describe("Testing POST api/teachers", () => {
  test("Content-Type -> JSON", async () => {
    const newTeacher = await request(app).post("/api/teachers").send({
      name: "TestName",
      lastname: "TestLastName",
      age: 22,
      class: "FBW21",
      location: "BER",
    });

    let expectedCase = "application/json; charset=utf-8";
    expect(newTeacher.headers["content-type"]).toBe(expectedCase);
    expect(newTeacher.statusCode).toBe(200);
    const response = await request(app).get("/api/teachers/TestName");
    expect(response.body).toEqual(
      expect.objectContaining({
        name: "TestName",
        lastname: "TestLastName",
        age: 22,
        class: "FBW21",
        location: "BER",
      })
    );
  });
});

describe("Testing GET api/teachers/:name", () => {
  test("Content-Type -> JSON", async () => {
    const response = await request(app).get("/api/teachers/Oliver");
    let expectedCase = "application/json; charset=utf-8";
    expect(response.headers["content-type"]).toBe(expectedCase);
  });
  test("It should respond with status code -> 200", async () => {
    const response = await request(app).get("/api/teachers/Oliver");
    expect(response.statusCode).toBe(200);
  });
  test("Content is an Object", async () => {
    const response = await request(app).get("/api/teachers/Oliver");
    expect(isObject(response.body)).toBe(true);
  });
});
