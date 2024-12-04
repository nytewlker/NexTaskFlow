const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
  },
  status: {
    type: String,
    enum: ["Not Started", "In Progress", "Completed", "On Hold"],
    default: "Not Started",
  },
  manager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User who manages the project
    required: true,
  },
  team: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to a User who is part of the team
      },
      role: {
        type: String,
        enum: ["Developer", "Tester", "Designer", "Viewer", "Manager"], // Role of the team member
        default: "Developer",
      },
    },
  ],
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task", // Reference to tasks associated with this project
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
