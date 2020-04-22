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
const exampleTeachers = [
  {
    name: "Oliver",
    lastname: "Weber",
    age: 30,
    classes: "FBW101",
    location: "BER",
  },
  {
    name: "Joe",
    lastname: "Doe",
    age: 39,
    classes: "FBW141",
    location: "HH",
  }
];

// default setup
db.defaults({
  students: [...exampleStudents],
  teachers: [...exampleTeachers]
}).write();

module.exports = {
  // TODO: get all 

  getStudents: () => {
    let students = db.get("students").value();
    return students;
  },
  getTeachers: () => {
    let teachers = db.get("teachers").value();
    return teachers;
  },

  // TODO: get by name

  getStudentByName: name => {
    let foundStudent = db
      .get("students")
      .find({ name: name })
      .value();
    return foundStudent;
  },
  getTeacherByName: name => {
    let foundTeachers = db
      .get("teachers")
      .find({ name: name })
      .value();
    return foundTeachers;
  },
  // TODO: update by name

  updateStudentByName: (name, changesObj) => {
    let updatedStudent = db
      .get("students")
      .find({ name: name })
      .assign(changesObj)
      .write();
    return updatedStudent;
  },
  updateTeacherByName: (name, changesObj) => {
    let updatedTeacher = db
      .get("teachers")
      .find({ name: name })
      .assign(changesObj)
      .write();
    return updatedTeacher;    
  },

  // TODO: remove by name

  removeStudentByName: name => {
    let removedStudent = db
      .get("students")
      .remove({ name: name })
      .write();
    return removedStudent;
  },
  removeTeacherByName: name => {
    let removedTeacher = db
      .get("teachers")
      .remove({ name: name })
      .write();
    return removedTeacher;
  },

  // TODO: add new 

  addStudent: studentObject => {
    let addedStudent = db
      .get("students")
      .push(studentObject)
      .write();
    return addedStudent;
  },
  addTeacher: teacherObject => {
    let addedTeachers = db
      .get("teachers")
      .push(teacherObject)
      .write();
    return addedTeachers;
  }
};
