const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("./data/teachers.json");
const db = low(adapter);

const exampleTeachers = [
  {
    name: "Oliver",
    lastname: "Weber",
    age: 30,
    classes: "FBW101",
    location: "BER",
    profession: "Full-stack"
  },
  {
    name: "Joe",
    lastname: "Doe",
    age: 39,
    classes: "FBW141",
    location: "HH",
    profession: "Front-end"
  }
];

// default setup
db.defaults({
  teachers: [...exampleTeachers]
}).write();

module.exports = {
  // TODO: get all teachers

  getTeachers: () => {
    let teachers = db.get("teachers").value();
    return teachers;
  },

  // TODO: get by name

  getTeacherByName: name => {
    let foundTeachers = db
      .get("teachers")
      .find({ name: name })
      .value();
    return foundTeachers;
  },

  // TODO: update by name

  updateTeacherByName: (name, changesObj) => {
    let updatedTeacher = db
      .get("teachers")
      .find({ name: name })
      .assign(changesObj)
      .write();
    return updatedTeacher;
  },

  // TODO: remove by name

  removeTeacherByName: name => {
    let removedTeacher = db
      .get("teachers")
      .remove({ name: name })
      .write();
    return removedTeacher;
  },

  // TODO: add new teacher

  addTeacher: teacherObject => {
    let addedTeachers = db
      .get("teachers")
      .push(teacherObject)
      .write();
    return addedTeachers;
  }
};
