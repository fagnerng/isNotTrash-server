var db = require('../config/db_config.js');

var User = require('../models/user.js')

exports.list = function(resolve, reject) {
    User.find({}, function(error, users) {
        if (error) {
            reject({
                error: 'Não foi possivel retornar os usuários'
            });
        } else {
            resolve(users);
        }
    });
};

/*id ou name*/
exports.user = function(query, resolve, reject) {

    User.find(query, function(error, user) {
        if (error) {
            reject({
                error: 'Não foi possivel retornar o usuário'
            });
        } else {
            resolve(user);
        }
    });
};

exports.save = function(name, email, password, phone, resolve, reject) {
    this.verificaEmail(email).then(function(permicao) {
        if (permicao) {
            new User({
                'name': name,
                'email': email,
                'password': password,
                'phone': phone
            }).save(function(error, user) {
                if (error) {
                    reject({
                        error: 'Não foi possível salvar o usuário'
                    });
                } else {
                    resolve({
                        "msg": "Usuário salvo com sucesso",
                        "user": user
                    });
                }
            });
        } else {
            reject({
                error: 'E-mail já cadastrado. Por favor insira outro e-mail'
            });
        }
    });
};

/*id eh necessario?*/
exports.update = function(name, email, password, phone, resolve, reject) {

    var selection = {
        "email": email
    };

    var update = {
        "name": name,
        "email": email,
        "password": password,
        "phone": phone
    }

    var option = {
        "new": true
    };

    User.findOneAndUpdate(selection, update, option, function(error, user) {
        if (error) {
            reject({
                error: 'Não foi possível atualizar o usuário'
            });
        } else {
            resolve({
                "msg": "Usuário atualziado com sucesso",
                "user": user
            });
        }
    });
};

/*id ou name*/
exports.delete = function(id, resolve, reject) {
    User.findById(id, function(error, user) {
        if (error) {
            reject({
                error: 'Não foi possível retornar o usuário'
            });
        } else {
            user.remove(function(error) {
                if (!error) {
                    resolve({
                        response: 'Usuário excluído com sucesso'
                    });
                }
            });
        }
    });
};

this.verificaEmail = function(email) {
    return User.find({
        'email': email
    }).then(function(existUser) {
        if (existUser.length === 0) {
            return true;
        } else {
            return false;
        }
    }, function() {
        return false;
    });
}