var jwt = require('jsonwebtoken');
var config = require('../config/config.js');
var User = require('../models/user.js')

exports.login = function(email, password, callback) {
  User.findOne({
    email: email
  }, function(err, user) {
    if (err) {

      callback({
        success: false,
        msg: "Erro ao acessar banco de dados"
      });

    } else if (!user) {

      callback({
        success: false,
        msg: 'Usuário não encontrado!'
      });

    } else if (user) {

      user.passwordVerification(password, function(ismatch) {

        if (ismatch) {

          var userInformations = {
            name: user.name,
            email: user.email,
            phone: user.phone
          };

          var token = jwt.sign(userInformations, config.secret);

          callback({
            success: true,
            msg: 'Logado com sucesso!',
            token: token,
            userInformations: userInformations
          });

        } else {
          callback({
            success: false,
            msg: 'Senha incorreta!'
          });
        }
      })
    }
  });
};