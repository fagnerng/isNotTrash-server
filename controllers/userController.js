var User = require('../models/user.js');

exports.list = (resolve, reject) => {
    User.find({}, (error, users) => {
        if (error) {
            reject({
                error: 'Não foi possivel retornar os usuários'
            });
        } else {
            resolve(users);
        }
    });
};

exports.user = (query, resolve, reject) => {

    User.find(query, (error, user) => {
        if (error) {
            reject({
                error: 'Não foi possivel retornar o usuário'
            });
        } else {
            resolve(user);
        }
    });
};

exports.save = (name, email, password, phone, resolve, reject) => {
    this.verificaEmail(email).then((permicao) => {
        if (permicao) {
            new User({
                'name': name,
                'email': email,
                'password': password,
                'phone': phone
            }).save((error, user) => {
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

exports.setPassord = (email, password, resolve, reject) => {
    User.update({
        email: email
    }, {
        $set: {
            password: password
        }
    }, (error) => {

        if (error) {
            reject({
                error: 'Não foi possível atualizar o usuário'
            });
        } else {
            resolve({
                sucess: 'Senha atualizada com sucesso'
            });
        }
    });
};

/*id eh necessario?*/
exports.update = (name, email, password, phone, resolve, reject) => {

    var selection = {
        "email": email
    };

    var update = {
        "name": name,
        "email": email,
        "password": password,
        "phone": phone
    };

    var option = {
        "new": true
    };

    User.findOneAndUpdate(selection, update, option, (error, user) => {
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
exports.delete = (id, resolve, reject) => {
    User.findById(id, (error, user) => {
        if (error) {
            reject({
                error: 'Não foi possível retornar o usuário'
            });
        } else {
            user.remove((error) => {
                if (!error) {
                    resolve({
                        response: 'Usuário excluído com sucesso'
                    });
                }
            });
        }
    });
};

this.verificaEmail = (email) => {
    return User.find({
        'email': email
    }).then((existUser) => {
        if (existUser.length === 0) {
            return true;
        } else {
            return false;
        }
    }, () => {
        return false;
    });
};

exports.findUserByEmail = function(email, resolve, reject) {
    return db.users.find({
        'email': email
    }, function(error, user) {
        if (error) {
            reject({
                error: 'Não foi possivel retornar o usuário'
            });
        } else {
            resolve(user);
        }
    });
};