const express = require("express");
const {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUserRole,
} = require("../controllers/uc");

const router = express.Router();

// Middleware
const { authenticate, authorize } = require("../middleware/authMiddleware");

// Routes
// 1. Register a new user
router.post("/register", registerUser);

// 2. Login user
router.post("/login", loginUser);

// 3. Get all users (Admin access only)
router.get("/", authenticate, authorize(["admin"]), getAllUsers);

// 4. Get user by ID
router.get("/:userId", authenticate, getUserById);

// 5. Update user role (Admin access only)
router.put("/:userId/role", authenticate, authorize(["Admin"]), updateUserRole);

module.exports = router;
