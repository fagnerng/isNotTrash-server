var express = require('express');
var router = express.Router();
var db = require('../db_config');

/*Rota que retorna todos os usuários*/
router.get('/', function(req, res) {
    db.User.find({}, function(error, users) {
        if(error) {
            res.json({error: 'Não foi possivel retornar os usuarios'});
        } else {
            res.json(users);
        }
    });
});

/*Rota que retorna o usuário específico*/
router.get('/:id', function(req, res) {
    var id = req.param('id');
    db.User.findById(id, function(error, user) {
        if(error) {
            res.json({error: 'Não foi possivel retornar o usuario'});
        } else {
            res.json(user);
        }
    });
});

/*Rota que cria um usuário*/
router.post('/', function(req, res) {
    var name = req.param('name');
    var email = req.param('email');
    var password = req.param('password');
    new db.User({
        'name': name,
        'email': email,
        'password': password
    }).save(function(error, user) {
        if(error) {
            res.json({error: 'Não foi possivel salvar o usuario'});
        } else {
            res.json(user);
        }
    });
});

/*Rota que atualiza um usuário*/
router.put('/', function(req, res) {
    var id = req.param('id');
    var name = req.param('name');
    var email = req.param('email');
    var password = req.param('password');
    db.User.findById(id, function(error, user) {
        if(error) {
            res.json({error: 'Não foi possivel atualizar o usuario'});
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
                    res.json({error: 'Não foi possivel salvar o usuario'});
                } else {
                    res.json(user);
                }
            });
        }
    });
});

/*Rota que deleta um usuário*/
router.delete('/:id', function(req, res) {
    var id = req.param('id');
    db.User.findById(id, function(error, user) {
        if(error) {
            callback({error: 'Não foi possivel retornar o usuario'});
        } else {
            user.remove(function(error) {
                if(!error) {
                    res.json({response: 'Usuário excluido com sucesso'});
                }
            });
        }
    });
});

module.exports = router;