const express = require('express');

const TaskController = require('../controllers/tasks');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.post('', checkAuth, TaskController.createTask);

router.put('/:id', checkAuth, TaskController.updateTask);

router.get('', TaskController.getTasks);

router.get('/:id', TaskController.getTask);

router.delete('/:id', checkAuth, TaskController.deleteTask);

module.exports = router;