
const express = require('express');
const router = express.Router();
const { 
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask,
    getTasksByUserId
} = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');

// Protected routes - require authentication
router.use(protect);

// Task routes
router.post('/', createTask);
router.get('/', getAllTasks);
router.get('/user', getTasksByUserId);
router.get('/:id', getTaskById);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

module.exports = router;

