const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("./data/db.json");
const db = low(adapter);

const exampleStudents = [
  {
    name: "Rupert",
    lastname: "Jalili",
    age: 30,
    class: "FBW101",
    location: "BER"
  },
  {
    name: "Rupertilla",
    lastname: "Jalili",
    age: 28,
    class: "FBW101",
    location: "BER"
  }
];

// default setup
db.defaults({
  students: [...exampleStudents]
}).write();

module.exports = {
  // TODO: get all students

  getStudents: () => {
    let students = db.get("students").value();
    return students;
  },

  // TODO: get by name

  getStudentByName: name => {
    db.get("students")
      .find({ name: name })
      .value();
  },

  // TODO: update by name

  updateStudentByName: name => {
    db.get("students");
    db.get("students")
      .remove({ name: name })
      .write();
  },
  // TODO: add new student
  addStudent: studentObject => {
    db.get("students")
      .push(studentObject)
      .write();
  }
};
