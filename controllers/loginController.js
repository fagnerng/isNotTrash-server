var jwt = require('jsonwebtoken');
var db = require('../config/db_config.js');
var config = require('../config/config.js');

exports.login = function(email, password, callback){
	db.users.findOne({email:email}, function(err, user){
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
				var userInformations = {_id:user._id, name:user.name, email: user.email, phone: user.phone};
		      	var token = jwt.sign(userInformations, config.secret);
  				
  				callback({
				success: true,
				msg: 'Logado com sucesso!',
				token: token,
				userInformations: userInformations
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