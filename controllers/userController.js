var db = require('../config/db_config.js');

exports.list = function(callback){
    db.users.find({}, function(error, users) {
        if(error) {
            callback({error: 'Não foi possivel retornar os usuários'});
        } else {
            callback(users);
        }
    });
};

/*id ou name*/
exports.user = function(id, callback) {
    db.users.findById(id, function(error, user) {
        if(error) {
            callback({error: 'Não foi possivel retornar o usuário'});
        } else {
            callback(user);
        }
    });
};

exports.save = function(name, email, password, phone, callback){
    this.verificaEmail(email).then(function(permicao){
      if(permicao){  
        new db.users({
            'name': name,
            'email': email,
            'password': password,
            'phone': phone
        }).save(function(error, user) {
            if(error) {
                callback({error: 'Não foi possível salvar o usuário'});
            } else {
                callback(user);
            }
        });
    }else{
        callback({error: 'E-mail já cadastrado. Por favor insira outro e-mail'});
    }
  });     
};

/*id eh necessario?*/
exports.update = function(id, name, email, password, phone, callback) {
    db.users.findById(id, function(error, user) {
        if(error) {
            callback({error: 'Não foi possível atualizar o usuário'});
        } else {
            user.name = name;
            user.email = email;
            user.password = password;
            user.phone = phone;
            user.save(function (error, user) {
                if (error) {
                    callback({error: 'Ocorreu um erro na atualização'});
                } else {
                    callback(user);
                }
            });
        }
    });
};

/*id ou name*/
exports.delete = function(id, callback) {
    db.users.findById(id, function(error, user) {
        if(error) {
            callback({error: 'Não foi possível retornar o usuário'});
        } else {
            user.remove(function(error) {
                if(!error) {
                    callback({response: 'Usuário excluido com sucesso'});
                }
            });
        }
    });
};

this.verificaEmail = function(email){
    return db.users.find({'email':email}).then(function(existUser){
        if(existUser.length === 0){
            return true; 
       } else {
            return false;
       }
    }, function(error){
        return false;
    });
}

