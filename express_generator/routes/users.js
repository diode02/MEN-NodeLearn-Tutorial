var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/b', function(req, res, next) {
  res.render('index', { title: 'Waqas khan' });
});
module.exports = router;
