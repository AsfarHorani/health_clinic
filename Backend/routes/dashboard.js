const express = require('express');
const router = express.Router();
const dashControllers = require('../controllers/dashboard');

router.get('/getActiveDoctors', dashControllers.getActiveDoctors);
router.post('/postAppointment',dashControllers.postAppointment);

module.exports = router;