const User = require("../models/User");
const mongoose = require("mongoose");

const nodemailer = require("nodemailer");

exports.notificationSender = async (req, res) => {
  // Configure the email transport settings
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

  const transporter = nodemailer.createTransport({
    host: "smtp.example.com", // Replace with your SMTP server hostname
    port: 587, // Replace with the port number of your SMTP server
    secure: false, // Set to true if your SMTP server requires a secure connection (TLS)
    auth: {
      user: "your-email@example.com", // Replace with your email address
      pass: "your-email-password", // Replace with your email password or an app-specific password
    },
  });

  // Function to send an email to all users
  async function sendEmailToAllUsers(subject, message) {
    try {
      // Retrieve all users
      const users = await User.find();

      // Loop through each user and send an email
      for (const user of users) {
        await transporter.sendMail({
          from: "your-email@example.com",
          to: user.email,
          subject,
          text: message,
        });
      }

      console.log("Emails sent successfully to all users");
    } catch (error) {
      console.error("Error sending emails:", error);
    }
  }

  const subject = req.body.subject;
  const message = req.body.message;

  try {
    sendEmailToAllUsers(subject, message);
    res.status(201).json({ message: "Notification sent successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
