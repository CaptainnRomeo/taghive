const User = require("../models/User");
const { hashPassword, comparePassword } = require("../utils/passwordUtils");
const jwt = require("jsonwebtoken");
const secretKey = "sajal12345";

exports.registerUser = async (req, res) => {
  const { username, password, role, schoolName } = req.body;

  try {
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(409).json({ error: "Username already exists" });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = new User({
      username,
      password: hashedPassword,
      role,
      schoolName,
    });

    await newUser.save();

    // Associate the user as a teacher if the role is 'teacher'
    // if (role === "teacher") {
    //   const teacher = newUser._id;
    //   await Course.updateMany({ teacher: null }, { teacher });
    // }

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.authenticateUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const token = jwt.sign({ username: user.username }, secretKey, {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Token not provided" });
  }

  jwt.verify(token, secretKey, async (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Token authentication failed" });
    }

    const username = user.username;
    console.log(username);
    try {
      const usercheck = await User.findOne({ username });

      if (!usercheck) {
        return res.status(404).json({ error: "User not found" });
      }

      const userId = usercheck._id;
      req.user = userId;
    } catch (error) {
      console.log(error);
    }

    next();
  });
};
