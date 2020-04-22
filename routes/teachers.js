const express = require("express");
const router = express.Router();

const teacherValidation = require("../middleware/teacherValidation");
const {
  getTeachers,
  getTeacherByName,
  updateTeacherByName,
  removeTeacherByName,
  addTeacher
} = require("../controller/teachers");

// - GET (all, individual)

router.get("/", getTeachers);

router.get("/:name", getTeacherByName);

// - PUT (individual)
router.put("/:name", teacherValidation, updateTeacherByName);
// // - DELETE (individual)
router.delete("/:name", removeTeacherByName);
// - POST (individual)
router.post("/", teacherValidation, addTeacher);

module.exports = router;
