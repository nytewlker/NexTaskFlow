const Project = require('../models/p');
const User = require('../models/u'); // Ensure User model is imported
const Tasks = require('../models/Task')
// 

const createProject = async (req, res) => {
  try {
    const { title, description, startDate, endDate, managerId,  } = req.body;

    // Validate manager
    const manager = await User.findById(managerId);
    if (!manager) {
      console.error("Manager not found:", managerId); // Log manager issue
      return res.status(404).json({ message: "Manager not found" });
    }

    // Create a new project
    const project = new Project({
      title,
      description,
      startDate,
      endDate,
      manager: managerId,
    });

    await project.save();
    res.status(201).json({ message: "Project created successfully", project });
  } catch (error) {
    console.error("Error creating project:", error); // Log the error
    console.error("Error details:", error.stack); // Log the error details
    res.status(500).json({ message: "Server error", error });
  }
};


  

  const getAllProjects = async (req, res) => {
    try {
      const projects = await Project.find()
        .populate("manager", "name email") // Populate manager details
        .populate("team.user", "name email") // Populate team member details
        .populate("tasks", "title status"); // Populate tasks
  
      res.status(200).json(projects);
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: "Server error", error });
    }
  };

  
  const getProjectById = async (req, res) => {
    try {
      const { projectId } = req.params;
  
      const project = await Project.findById(projectId)
        .populate("manager", "name email")
        .populate("team.user", "name email")
        .populate("tasks", "title status");
  
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
  
      res.status(200).json(project);
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };

  
  const updateProject = async (req, res) => {
    try {
      const { projectId } = req.params; // You're using 'projectId' here
      const updateData = req.body;
  
      const project = await Project.findByIdAndUpdate(
        projectId,
        { ...updateData, updatedAt: Date.now() },
        { new: true } // Return updated project
      )
        .populate("manager", "name email")
        .populate("team.user", "name email")
        .populate("tasks", "title status");
  
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
  
      res.status(200).json({ message: "Project updated successfully", project });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };
  

  
  const deleteProject = async (req, res) => {
    try {
      const { projectId } = req.params;
  
      const project = await Project.findByIdAndDelete(projectId);
  
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
  
      res.status(200).json({ message: "Project deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };

  
  const addTeamMember = async (req, res) => {
    try {
      const { projectId } = req.params;
      const { userId, role } = req.body;
  
      const project = await Project.findById(projectId);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
  
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Check if user is already in the team
      const isAlreadyInTeam = project.team.some((member) => member.user.equals(userId));
      if (isAlreadyInTeam) {
        return res.status(400).json({ message: "User is already a team member" });
      }
  
      project.team.push({ user: userId, role });
      await project.save();
  
      res.status(200).json({ message: "Team member added successfully", project });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };

  
  const removeTeamMember = async (req, res) => {
    try {
      const { projectId } = req.params;
      const { userId } = req.body;
  
      const project = await Project.findById(projectId);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
  
      project.team = project.team.filter((member) => !member.user.equals(userId));
      await project.save();
  
      res.status(200).json({ message: "Team member removed successfully", project });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };

  
  const addTaskToProject = async (req, res) => {
    try {
      const { projectId } = req.params;
      const { taskId } = req.body;
  
      const project = await Project.findById(projectId);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
  
      const task = await Task.findById(taskId);
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
  
      // Add task to the project
      project.tasks.push(taskId);
      await project.save();
  
      res.status(200).json({ message: "Task added to project successfully", project });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };

  
  const removeTaskFromProject = async (req, res) => {
    try {
      const { projectId } = req.params;
      const { taskId } = req.body;
  
      const project = await Project.findById(projectId);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
  
      project.tasks = project.tasks.filter((task) => !task.equals(taskId));
      await project.save();
  
      res.status(200).json({ message: "Task removed from project successfully", project });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };

  module.exports = {
    createProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject,
    addTeamMember,
    removeTeamMember,
    addTaskToProject,
    removeTaskFromProject,
  };
  