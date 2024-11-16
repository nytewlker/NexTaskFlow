const express = require('express');
const Project = require('../models/Project');
const router = express.Router();

// Get all projects
router.get('/get', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Add new project
// POST route to add a project
router.post('/add', async (req, res) => {
    try {
      const { name, body, status, assignee, isActive } = req.body;
  
      // Create a new project object
      const project = new Project({
        name,
        body,
        status,
        assignee,
        isActive,
      });
  
      // Save the project to the database
      await project.save();
      res.status(201).json(project);
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: 'Invalid data' });
    }
});

// Update project
router.put('/update/:id', async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(project);
  } catch (err) {
    res.status(400).json({ error: 'Invalid data' });
  }
});

// Delete project
router.delete('/delete/:id', async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
