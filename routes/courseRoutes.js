const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");

router.post("/", courseController.createCourse);
router.put("/:courseId", courseController.updateCourse);
router.delete("/:courseId", courseController.deleteCourse);
router.get("/", courseController.getAvailableCourses);
router.post("/:courseId/enroll", courseController.enrollInCourse);
router.get("/enrolled", courseController.getEnrolledCourses);
router.put("/:courseId/progress/", courseController.updateProgress);
router.get("/:courseId/progress/", courseController.getCurrentProgress);
module.exports = router;
