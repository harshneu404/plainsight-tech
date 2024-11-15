const express = require('express');
const router = express.Router();

const tasks = require('../controller/tasks.controller');
const verifyBasicAuth = require('../middleware/autehnticate');

router.post('/',verifyBasicAuth,tasks.createTask);
router.put('/:id',verifyBasicAuth,tasks.updateTask);
router.delete('/:id',verifyBasicAuth,tasks.deleteTask);
router.get('/',verifyBasicAuth,tasks.getTasks);

module.exports = router;
