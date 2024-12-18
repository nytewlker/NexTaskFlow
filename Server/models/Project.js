const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tasks: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Task" 
  }],
  status :{
    type: String,
    enum: ['Pending', 'In Progress', 'Completed'],
    default: 'Pending',

  },
  assignee: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  teamMembers: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User" 
  }],
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model("Project", projectSchema);