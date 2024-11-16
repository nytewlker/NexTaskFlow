const express = require("express");
const Project = require("../models/Project");
const router = express.Router();

// Get all projects
router.get("/get", async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});

// Add a project
router.post("/add", async (req, res) => {
  const { name, description, status, assignee } = req.body;

  if (!name || !description) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const newProject = new Project({ name, description, status, assignee });
    await newProject.save();
    res.json(newProject);
  } catch (err) {
    res.status(500).json({ error: "Failed to add project" });
  }
});

// Update a project
router.put("/update/:id", async (req, res) => {
  const { name, description, status, assignee } = req.body;

  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      { name, description, status, assignee },
      { new: true }
    );
    res.json(updatedProject);
  } catch (err) {
    res.status(500).json({ error: "Failed to update project" });
  }
});

// Delete a project
router.delete("/delete/:id", async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: "Project deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete project" });
  }
});

module.exports = router;
