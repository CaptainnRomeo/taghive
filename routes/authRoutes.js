const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const courseController = require("../controllers/courseController");
const courseRoutes = require("./courseRoutes");
const { notificationSender } = require("../controllers/notificationController");

router.post("/register", userController.registerUser);
router.post("/authenticate", userController.authenticateUser);
router.use(userController.authenticateToken);
// Course endpoints
router.use("/courses", courseRoutes);
// Notification Endpoint
router.post("/notify", notificationSender);

module.exports = router;
