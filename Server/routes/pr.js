const express = require("express");
const {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
  addTeamMember,
  removeTeamMember,
  addTaskToProject,
  removeTaskFromProject,
} = require("../controllers/pc");

const router = express.Router();

// Middleware for authentication and role-based access control can be added here
const { authenticate, authorize } = require("../middleware/authMiddleware");


  ///1.  Route to create a project (only accessible to Manager and admin)
  router.post("/", authenticate, authorize(["manager", "admin"]), createProject);


// 2. Get all projects
router.get("/", authenticate, getAllProjects);

// 3. Get a single project by ID
router.get("/:projectId", authenticate, getProjectById);


//4.  Route to update a project (only accessible to Manager and admin)
router.put("/:projectId", authenticate, authorize(["manager", "admin"]), updateProject);

// 5. Delete a project (only accessible to managers or admins)
router.delete("/:projectId", authenticate, authorize(["manager", "admin"]), deleteProject);

// 6. Add a team member to the project
router.post("/:projectId/team", authenticate, authorize(["manager", "admin"]), addTeamMember);

// 7. Remove a team member from the project
router.delete("/:projectId/team", authenticate, authorize(["manager", "admin"]), removeTeamMember);

// 8. Add a task to the project
router.post("/:projectId/tasks", authenticate, addTaskToProject);

// 9. Remove a task from the project
router.delete("/:projectId/tasks", authenticate, removeTaskFromProject);

module.exports = router;
