var express = require('express'),
  router = express.Router(),
  establishmentController = require('../controllers/establishmentController.js'),
  validator = require('validator');

router.get('/', (req, res) => {

  establishmentController.query(query, (resp) => {
    res.json(resp.content);
  });
});


router.post('/', function(req, res) {

  var name = req.body.name;
  var city = req.body.city;

  establishmentController.create(name, city, (resp) => {
    res.json(resp.content);
  });
});

module.exports = router;