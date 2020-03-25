const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("data/db.json");
const db = low(adapter);

const exampleStudent = {
  name: "Rupert",
  lastname: "Jalili",
  age: 30,
  class: "FBW101",
  location: "BER"
};

// default setup
db.defaults({
  students: [exampleStudent]
}).write();

module.exports = {
  // TODO: get all students
  // TODO: get by name
  // TODO: update by name
  // TODO: delete by name
  // TODO: add new student
};
