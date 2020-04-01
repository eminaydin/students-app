const low = require("lowdb");
const path = require("path");
const dataPath = path.join(__dirname, "../data/db.json");

const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync(dataPath);
const db = low(adapter);
const exampleStudents = [
  {
    name: "Rupert",
    lastname: "Jalili",
    age: 30,
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

  getStudents: (req, res) => {
    let students = db.get("students").value();
    console.log(students);
    res.status(200).json(students);
  },

  // TODO: get by name

  getStudentByName: (req, res) => {
    let foundStudent = db
      .get("students")
      .find({ name: req.params.name })
      .value();
    if (foundStudent) {
      return res.status(200).json(foundStudent);
    }
    res.status(404).json({ error: "Student Not Found" });
  },

  // TODO: update by name

  updateStudentByName: (req, res) => {
    let updatedStudent = db
      .get("students")
      .find({ name: req.params.name })
      .assign(req.body)
      .write();
    res.send(updatedStudent);
  },

  // TODO: remove by name

  removeStudentByName: (req, res) => {
    let removedStudent = db
      .get("students")
      .remove({ name: req.params.name })
      .write();
    res.send(removedStudent);
  },

  // TODO: add new student

  addStudent: (req, res) => {
    let addedStudent = db
      .get("students")
      .push(req.body)
      .write();
    if (addedStudent) {
      res.send(req.body);
    }
    res.send("Not a valid student");
  }
};
