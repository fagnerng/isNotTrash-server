var express = require('express');
var router = express.Router();

var loginController = require('../controllers/loginController.js');

/*Rota padrão '/' verifica se o servidor está online*/
router.post('/', function(req, res){

	var email = req.body.email;
	var password =  req.body.password;

	loginController.login(email, password, function(resp){
		res.json(resp);
	});
});

module.exports = router;