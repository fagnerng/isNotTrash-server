var express = require('express'),
  router = express.Router(),
  establishmentController = require('../controllers/establishmentController.js'),
  validator = require('validator');

router.post('/', function(req, res) {

  var name = req.body.name;
  var city = req.body.city;

  console.log("Router:");
  console.log("name: " + name);
  console.log("city: " + city);

  establishmentController.create(name, city, function(resp) {
    res.status(resp.status).send(resp.msg);
  });
});

module.exports = router;
