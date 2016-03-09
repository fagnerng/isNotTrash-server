var db = require('../config/db_config.js');

exports.list = function(callback){
    db.User.find({}, function(error, users) {
        if(error) {
            callback({error: 'Não foi possivel retornar os usuários'});
        } else {
            callback(users);
        }
    });
};

/*id ou name*/
exports.user = function(id, callback) {
    db.User.findById(id, function(error, user) {
        if(error) {
            callback({error: 'Não foi possivel retornar o usuário'});
        } else {
            callback(user);
        }
    });
};

exports.save = function(name, email, password, phone, callback){
    var language = 'pt-br';
    this.verificaEmail(email).then(function(permicao){
      if(permicao){  
        new db.User({
            'name': name,
            'email': email,
            'password': password,
            'phone': phone,
            'settings': {
                'language': language
            }
        }).save(function(error, user) {
            if(error) {
                callback({error: 'Não foi possível salvar o usuário'});
            } else {
                callback(user);
            }
        });
    }else{
        callback({error: 'E-mail já cadastrado.'});
    }
  });     
};

exports.setPassord = function(email, password, callback) {
    db.User.update({email: email},{$set:{password: password}}, function(error) {
        if(error) {
            callback({error: 'Não foi possível atualizar o usuário'});
        } else {
            callback({sucess: 'Senha atualizada com sucesso'});
        }
    });
};

exports.update = function(email, name, newEmail, phone, language, callback) {
    var data = {};
    if (name != null && name != "") {
        data.name = name;
    }
    if (newEmail != null && newEmail != "") {
        data.email = newEmail;
    }
    if (phone != null && phone != "") {
        data.phone = phone;
    }
    if (language != null && language != "") {
        data.language = language;
    }
    console.log(data);
    db.User.update({email:email}, {$set:data}, function(error, user) {
        if(error) {
            callback({error: 'Não foi possível atualizar o usuário'});
        } else {
            callback({sucess: 'Usuário atualizados com sucesso'});
        }
    });
};

exports.delete = function(id, callback) {
    db.User.findById(id, function(error, user) {
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
    return db.User.find({'email':email}).then(function(existUser){
        if(existUser.length === 0){
            return true; 
       } else {
            return false;
       }
    }, function(error){
        return false;
    });
}

