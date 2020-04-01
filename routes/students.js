const express = require("express");
const router = express.Router();
const validation = require("../middleware/validation");
const controller = require("../controller/students");

// - GET (all, individual)

router.get("/", controller.getAllStudents);
router.get("/:name", controller.getStudent);

// - PUT (individual)
router.put("/:name", validation, controller.putStudent);

// // - DELETE (individual)
router.delete("/:name", controller.deleteStudent);

// - POST (individual)
router.post("/", validation, controller.postStudent);

module.exports = router;
