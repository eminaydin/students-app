let { db } = require("../data/db");

module.exports = {
  // TODO: get all teachers

  getTeachers: (req, res) => {
    let teachers = db.get("teachers").value();
    res.status(200).json(teachers);
  },

  // TODO: get by name

  getTeacherByName: (req, res) => {
    let foundTeacher = db
      .get("teachers")
      .find({ name: req.params.name })
      .value();
    if (foundTeacher) {
      return res.status(200).json(foundTeacher);
    teachers}
    res.status(404).json({ error: "Teacher Not Found" });
  },

  // TODO: update by name

  updateTeacherByName: (req, res) => {
    let updatedTeacher = db
      .get("teachers")
      .find({ name: req.params.name })
      .assign(req.body)
      .write();

    res.send(updatedTeacher);
  },

  // TODO: remove by name

  removeTeacherByName: (req, res) => {
    let removedTeacher = db
      .get("teachers")
      .remove({ name: req.params.name })
      .write();

    res.send(removedTeacher);
  },

  // TODO: add new teacher

  addTeacher: (req, res) => {
    let addedTeacher = db.get("teachers").push(req.body).write();
    if (addedTeacher) {
      return res.status(200).json(addedTeacher);
    }
    res.status(500).json({ error: "Invalid Teacher" });
  },
};
