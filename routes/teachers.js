const express = require("express");
const router = express.Router();
const validation = require("../middleware/validation");
const controller = require("../controller/teachers.js");


// - GET (all, individual)

router.get("/", controller.getAllTeachers);
router.get("/:name", controller.getTeacher);

// - PUT (individual)
router.put("/:name", validation, controller.putTeacher);

// // - DELETE (individual)
router.delete("/:name", controller.deleteTeacher);

// - POST (individual)
router.post("/", validation, controller.postTeachers);

module.exports = router;
