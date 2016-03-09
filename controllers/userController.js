var db = require('../config/db_config.js');

exports.list = function(resolve, reject){
    db.users.find({}, function(error, users) {
        if(error) {
            reject({error: 'Não foi possivel retornar os usuários'});
        } else {
            resolve(users);
        }
    });
};

/*id ou name*/
exports.user = function(id, resolve, reject) {
    db.users.findById(id, function(error, user) {
        if(error) {
            reject({error: 'Não foi possivel retornar o usuário'});
        } else {
            resolve(user);
        }
    });
};

exports.save = function(name, email, password, phone, resolve, reject){
    this.verificaEmail(email).then(function(permicao){
    if(permicao){
        new db.users({
            'name': name,
            'email': email,
            'password': password,
            'phone': phone
        }).save(function(error, user) {
            if(error) {
                reject({error: 'Não foi possível salvar o usuário'});
            } else {
                resolve(user);
            }
        });
    }else{
        reject({error: 'E-mail já cadastrado. Por favor insira outro e-mail'});
    }
  });     
};

/*id eh necessario?*/
exports.update = function(id, name, email, password, phone, resolve, reject) {
    db.users.findById(id, function(error, user) {
        if(error) {
            reject({error: 'Não foi possível atualizar o usuário'});
        } else {
            user.name = name;
            user.email = email;
            user.password = password;
            user.phone = phone;
            user.save(function (error, user) {
                if (error) {
                    reject({error: 'Ocorreu um erro na atualização'});
                } else {
                    resolve(user);
                }
            });
        }
    });
};

/*id ou name*/
exports.delete = function(id, resolve, reject) {
    db.users.findById(id, function(error, user) {
        if(error) {
            reject({error: 'Não foi possível retornar o usuário'});
        } else {
            user.remove(function(error) {
                if(!error) {
                    resolve({response: 'Usuário excluído com sucesso'});
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
    }, function(){
        return false;
    });
}

