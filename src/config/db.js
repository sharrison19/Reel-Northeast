const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB using Mongoose
mongoose.connect("mongodb://localhost:27017/reel_northeast", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

// Create a Mongoose schema for the user
const signupSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  userName: String,
  password: String,
});

// Create a Mongoose model based on the signupSchema
const User = mongoose.model("User", signupSchema);

// Define a route to handle user registration
app.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, username, password } = req.body;

    // Check if the email already exists in the database
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(409).json({ message: "Email already exists" });
    }

    // Check if the username already exists in the database
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(409).json({ message: "Username already exists" });
    }

    // Create a new user document using the User model
    const newUser = new User({
      firstName,
      lastName,
      email,
      username,
      password,
    });

    // Save the new user to the database
    await newUser.save();

    // Generate a JWT token
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET);

    // Return the token to the client
    res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
});

// Define a route to handle user authentication
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the user exists in the database
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Check if the password is correct
    if (password !== user.password) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    // Return the token to the client
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
});

// Define a protected route that requires authentication
app.get("/protected", auth, (req, res) => {
  res.json({ message: "Protected route accessed successfully" });
});

// Start the server
app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});
