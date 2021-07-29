var express = require('express');
var router = express.Router();
const DoctorsController = require('../controller/DoctorsController');
const NotesController = require('../controller/NotesController');
const PatientsController = require('../controller/PatientsController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/patients', PatientsController.request);
router.get('/patient/:id', PatientsController.requestById);
router.post('/patient/signup', PatientsController.create);
router.put('/patient/:id', PatientsController.update);
router.delete('/patient/:id', PatientsController.delete);

router.get('/notes/:patient_id', NotesController.request);
router.post('/notes/:patient_id', NotesController.create);
router.post('/doctors/signup', DoctorsController.create);
module.exports = router;
