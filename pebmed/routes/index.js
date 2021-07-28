var express = require('express');
var router = express.Router();
const DoctorsController = require('../controller/DoctorsController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/doctors/signup', DoctorsController.create);
module.exports = router;
