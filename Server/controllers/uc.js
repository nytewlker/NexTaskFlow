const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/u");

const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await user.save();
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};



const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Verify password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid password" });
      }
  
      // Generate token
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
  
      res.status(200).json({ message: "Login successful", token, user });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };

  
  const getAllUsers = async (req, res) => {
    try {
      const users = await User.find().select("-password"); // Exclude password
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };

  
  const getUserById = async (req, res) => {
    try {
      const { userId } = req.params;
  
      const user = await User.findById(userId).select("-password"); // Exclude password
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };

  
  const updateUserRole = async (req, res) => {
    try {
      const { userId } = req.params;
      const { role } = req.body;
  
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      user.role = role;
      await user.save();
  
      res.status(200).json({ message: "User role updated successfully", user });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };

  

  module.exports = {
    registerUser,
    loginUser,
    getAllUsers,
    getUserById,
    updateUserRole,
  };