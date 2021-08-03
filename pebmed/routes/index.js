var express = require('express');
var router = express.Router();
const DoctorsController = require('../controller/DoctorsController');
const NotesController = require('../controller/NotesController');
const PatientsController = require('../controller/PatientsController');
const SchedulesController = require('../controller/SchedulesController');
const LoginController = require('../controller/LoginController');
const verifyJWT = require('../middlewares/verifyJWT');

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/login', LoginController);

router.get('/patients', verifyJWT, PatientsController.request);
router.get('/patient/:id', verifyJWT, PatientsController.requestById);
router.post('/patient/signup', verifyJWT, PatientsController.create);
router.put('/patient/:id', verifyJWT, PatientsController.update);
router.delete('/patient/:id', verifyJWT, PatientsController.delete);

router.get('/notes/:patient_id', verifyJWT, NotesController.request);
router.post('/notes/:patient_id', verifyJWT, NotesController.create);

router.post('/doctors/signup', verifyJWT, DoctorsController.create);

router.get('/schedules/:patient_id', verifyJWT, SchedulesController.request);
router.post('/schedules/create', verifyJWT, SchedulesController.create);
router.put('/schedules/:patient_id/:id', verifyJWT, SchedulesController.update);
router.delete('/schedules/:patient_id/:id', verifyJWT, SchedulesController.delete);
module.exports = router;
