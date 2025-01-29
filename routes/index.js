const router = require('express').Router();
const { addUser, getUsers, logExercise, getUserLogs } = require('../controllers');


router.post('/api/users', addUser);
router.get('/api/users', getUsers);
router.post('/api/users/:id/exercises', logExercise);
router.get('/api/users/:id/logs', getUserLogs);

module.exports =  router;
