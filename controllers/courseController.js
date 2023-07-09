const Course = require("../models/Course");
const User = require("../models/User");
const mongoose = require("mongoose");

exports.createCourse = async (req, res) => {
  const { title, description } = req.body;
  const userId = req.user;
  console.log(req);

  try {
    const usercheck = await User.findById(userId);

    if (!usercheck) {
      return res.status(404).json({ error: "User not found" });
    }

    const userRole = usercheck.role;
    if (userRole != "teacher") {
      return res
        .status(403)
        .json({ error: "You are not authorized to update this course" });
    }
  } catch (error) {
    console.log(error);
  }

  try {
    const newCourse = new Course({
      title,
      description,
      teacher: userId,
    });

    await newCourse.save();

    res.status(201).json({ message: "Course created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateCourse = async (req, res) => {
  const { courseId } = req.params;
  const { title, description } = req.body;
  const userId = req.user;

  try {
    const usercheck = await User.findById(userId);

    if (!usercheck) {
      return res.status(404).json({ error: "User not found" });
    }

    const userRole = usercheck.role;
    if (userRole != "teacher") {
      return res
        .status(403)
        .json({ error: "You are not authorized to update this course" });
    }
  } catch (error) {
    console.log(error);
  }

  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      { title, description },
      { new: true }
    );

    if (!updatedCourse) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.status(200).json({ message: "Course updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteCourse = async (req, res) => {
  const { courseId } = req.params;
  const userId = req.user;
  try {
    const usercheck = await User.findById(userId);

    if (!usercheck) {
      return res.status(404).json({ error: "User not found" });
    }

    const userRole = usercheck.role;
    if (userRole != "teacher") {
      return res
        .status(403)
        .json({ error: "You are not authorized to update this course" });
    }
  } catch (error) {
    console.log(error);
  }
  try {
    const deletedCourse = await Course.findByIdAndDelete(courseId);

    if (!deletedCourse) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getAvailableCourses = async (req, res) => {
  try {
    const courses = await Course.find();

    res.status(200).json({ courses });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.enrollInCourse = async (req, res) => {
  const { courseId } = req.params;
  const userId = req.user;
  // console.log(userId);
  const usercheck = await User.findById(userId);
  // console.log(usercheck);
  try {
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    // console.log(usercheck);
    // Check if the authenticated user is a student
    if (usercheck.role !== "student") {
      return res
        .status(403)
        .json({ error: "Only students are allowed to enroll in courses" });
    }

    // Add the student's userId to the enrolledStudents array of the course
    course.enrolledStudents.push(userId);
    course.progress.push({ student: userId, isCompleted: false });
    await course.save();

    res.status(200).json({ message: "Enrollment successful" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getEnrolledCourses = async (req, res) => {
  const userId = req.user;

  try {
    const enrolledCourses = await Course.find({ enrolledStudents: userId });

    res.status(200).json({ enrolledCourses });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateProgress = async (req, res) => {
  const { courseId } = req.params;
  const userId = req.user;
  const { isCompleted } = req.body;

  try {
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // Find the progress object for the specified user in the course
    const progressObj = course.progress.find(
      (progress) => progress.student.toString() == userId
    );

    if (!progressObj) {
      return res.status(404).json({ error: "User progress not found" });
    }

    // Update the isCompleted field
    progressObj.isCompleted = isCompleted;

    await course.save();

    res.status(200).json({ message: "Progress updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getCurrentProgress = async (req, res) => {
  const { courseId } = req.params;
  const userId = req.user;
  console.log(userId);
  try {
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // Find the progress object for the specified user in the course
    const progressObj = course.progress.find(
      (progress) => progress.student.toString() == userId
    );
    console.log(course.progress);
    console.log(progressObj);
    if (!progressObj) {
      return res.status(404).json({ error: "User progress not found" });
    }

    res.status(200).json({ Completed: progressObj.isCompleted });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
