var db = require('../db_config.js');

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

exports.save = function(name, email, password, callback){
    new db.User({
        'name': name,
        'email': email,
        'password': password,
    }).save(function(error, user) {
        if(error) {
            callback({error: 'Não foi possivel salvar o usuario'});
        } else {
            callback(user);
        }
    });
};

/*id eh necessario?*/
exports.update = function(id, name, email, password, callback) {
    db.User.findById(id, function(error, user) {
        if(error) {
            callback({error: 'Não foi possivel atualizar o usuario'});
        } else {
            if (name) {
                user.name = name;
            }
            if (email) {
                user.email = email;
            }
            if (password) {
                user.password = password;
            }
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