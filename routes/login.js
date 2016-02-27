var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var db = require('../config/db_config.js');
var config = require('../config/config.js');
var secret = "segredo";

/*Rota padrão '/' verifica se o servidor está online*/
router.post('/', function(req, res){
  db.User.findOne({email:req.body.email}, function(err, user){
  	if(err){
  		res.json({
  			success: false,
  			msg: "Erro ao acessar banco de dados"
  		});
  	}else if(!user){
  		res.status(404).json({
        success: false,
        msg: 'Usuário não encontrado!'
      	});
  	}else if(user){
  		user.passwordVerification(req.body.password, function(ismatch){
  			if(ismatch){
		      	var token = jwt.sign(user.name, secret);
  				
  				res.status(202).json({
				success: true,
				msg: 'Logado com sucesso!',
				token: token
        		});
  			}else{
  				res.status(401).json({
		        success: false,
		        msg: 'Senha incorreta!'
		      	});
  			}
  		})
  	}
  });
});

module.exports = router;