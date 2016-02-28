var jwt = require('jsonwebtoken');
var db = require('../config/db_config.js');
var config = require('../config/config.js');

exports.login = function(email, password, callback){
	db.User.findOne({email:email}, function(err, user){
  	if(err){
  		callback({
  			success: false,
  			msg: "Erro ao acessar banco de dados"
  		});
  	}else if(!user){
  		callback({
        success: false,
        msg: 'Usuário não encontrado!'
      	});
  	}else if(user){
  		user.passwordVerification(password, function(ismatch){
  			if(ismatch){
		      	var token = jwt.sign(user.name, config.secret);
  				
  				callback({
				success: true,
				msg: 'Logado com sucesso!',
				token: token
        		});
  			}else{
  				callback({
		        success: false,
		        msg: 'Senha incorreta!'
		      	});
  			}
  		})
  	}
  });
};