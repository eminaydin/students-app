const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const studentsDataPath = path.join(__dirname, "../data/students.json");
const validation = require("../middleware/validation");

// - GET (all, individual)

router.get("/", (req, res) => {
  fs.readFile(studentsDataPath, "utf-8", (err, data) => {
    if (err) throw err;
    res.status(200).json(JSON.parse(data));
  });
});

router.get("/:name", (req, res) => {
  fs.readFile(studentsDataPath, "utf-8", (err, data) => {
    if (err) console.log(err);
    data = JSON.parse(data);
    const student = data.find(
      ({ name }) => name.toLowerCase() === req.params.name.toLowerCase()
    );

    if (student) {
      return res.status(200).json(student);
    }
    res.status(404).json({ error: "Student not found" });
  });
});

// - PUT (individual)
router.put("/:name", validation, (req, res) => {
  let students = fs.readFileSync(studentsDataPath, "utf-8");
  students = JSON.parse(students);
  if (req.params.name && req.body) {
    students = students.map((student) => {
      if (student.name.toLowerCase() === req.params.name.toLowerCase()) {
        Object.assign(student, req.body);
      }

      return student;
    });
  }
  fs.writeFileSync(studentsDataPath, JSON.stringify(students));
  res.send(students);
});
// // - DELETE (individual)
router.delete("/:name", (req, res) => {
  let students = fs.readFileSync(studentsDataPath, "utf-8");
  students = JSON.parse(students);

  if (req.params.name) {
    students = students.filter(
      ({ name }) => name.toLowerCase() !== req.params.name.toLowerCase()
    );
    fs.writeFileSync(studentsDataPath, JSON.stringify(students));
  }

  res.send(students);
});
// - POST (individual)
router.post("/", validation, (req, res) => {
  let students = fs.readFileSync(studentsDataPath, "utf-8");
  students = JSON.parse(students);

  if (students) {
    fs.writeFileSync(studentsDataPath, JSON.stringify(students));
    return res.send({
      status: "success",
      message: `student with name: ${req.body.name} added`
    });
  }

  res.send("NO!");
});

module.exports = router;
