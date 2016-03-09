var express = require('express');
var router = express.Router();

var userController = require('../controllers/userController.js');
var validator = require('validator');

/*Rota que retorna todos os usuários*/
router.get('/', function(req, res) {
    userController.list(function(resp) {
        if(resp.error !== undefined){
            res.send(resp, 404);
        } else {
            res.send(resp, 200);
        }
    });
});

/*Rota que retorna o usuário específico*/
router.get('/:id', function(req, res) {
    var id = validator.trim(validator.escape(req.param('id')));

    userController.user(id, function(resp) {
        if(resp.error !== undefined){
            res.send(resp, 404);
        } else {
            res.send(resp, 200);
        }
     });
});

/*Rota que cria um usuário*/
router.post('/', function(req, res) {
    var name = validator.trim(validator.escape(req.param('name')));
    var email = validator.trim(validator.escape(req.param('email')));
    var password = validator.trim(validator.escape(req.param('password')));
    var phone = validator.trim(validator.escape(req.param('phone')));

    userController.save(name, email, password,phone, function(resp) {
        if(resp.error !== undefined){
            res.send(resp, 400);
        } else {
            res.send(resp, 200);
        }
    });
});

/*Rota que atualiza a senha do usuário*/
router.put('/setPassword', function(req, res) {
    var email = validator.trim(validator.escape(req.param('email')));
    var password = validator.trim(validator.escape(req.param('password')));

    userController.setPassord(email,password, function(resp) {
        if(resp.error !== undefined){
            res.send(resp, 400);
        } else {
            res.send(resp, 200);
        }
    });
});

/*Rota que atualiza os dados do usuário*/
router.put('/', function(req, res) {
    var email = validator.trim(validator.escape(req.param('email')));
    var name = validator.trim(validator.escape(req.param('name')));
    var newEmail = validator.trim(validator.escape(req.param('newEmail')));
    var phone = validator.trim(validator.escape(req.param('phone')));
    var language = validator.trim(validator.escape(req.param('language')));

    userController.update(email, name, newEmail, phone,language, function(resp) {
        if(resp.error !== undefined){
            res.send(resp, 400);
        } else {
            res.send(resp, 200);
        }
    });
});

/*Rota que deleta um usuário*/
router.delete('/:id', function(req, res) {
    var id = validator.trim(validator.escape(req.param('id')));
    userController.delete(id, function(resp) {
        if(resp.error !== undefined){
            res.send(resp, 404);
        } else {
            res.send(resp, 200);
        }
    });
});

module.exports = router;