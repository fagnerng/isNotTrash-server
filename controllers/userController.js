var db = require('../config/db_config.js');

exports.list = function(callback){
    db.User.find({}, function(error, users) {
        if(error) {
            callback({error: 'Não foi possivel retornar os usuarios'});
        } else {
            callback(users);
        }
    });
};

/*id ou name*/
exports.user = function(id, callback) {
    db.User.findById(id, function(error, user) {
        if(error) {
            callback({error: 'Não foi possivel retornar o usuario'});
        } else {
            callback(user);
        }
    });
};

exports.save = function(name, email, password, phone, callback){
    new db.User({
        'name': name,
        'email': email,
        'password': password,
        'phone': phone
    }).save(function(error, user) {
        if(error) {
            callback({error: 'Não foi possivel salvar o usuario'});
        } else {
            callback(user);
        }
    });
};

/*id eh necessario?*/
exports.update = function(id, name, email, password, phone, callback) {
    db.User.findById(id, function(error, user) {
        if(error) {
            callback({error: 'Não foi possivel atualizar o usuario'});
        } else {
            user.name = name;
            user.email = email;
            user.password = password;
            user.phone = phone;
            user.save(function (error, user) {
                if (error) {
                    callback({error: 'Não foi possivel salvar o usuario'});
                } else {
                    callback(user);
                }
            });
        }
    });
};

/*id ou name*/
exports.delete = function(id, callback) {
    db.User.findById(id, function(error, user) {
        if(error) {
            callback({error: 'Não foi possivel retornar o usuario'});
        } else {
            user.remove(function(error) {
                if(!error) {
                    callback({response: 'Usuário excluido com sucesso'});
                }
            });
        }
    });
};



