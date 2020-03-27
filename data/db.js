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
    let foundStudent = db
      .get("students")
      .find({ name: name })
      .value();
    console.log(foundStudent);
    return foundStudent;
  },

  // TODO: update by name

  updateStudentByName: name => {
    let removedStudent = db
      .get("students")
      .remove({ name: name })
      .write();
    return removedStudent;
  },
  // TODO: add new student
  addStudent: studentObject => {
    let addedStudent = db
      .get("students")
      .push(studentObject)
      .write();
    return addedStudent;
  }
};
