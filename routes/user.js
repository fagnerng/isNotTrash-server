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

/*Rota que atualiza um usuário*/
router.put('/', function(req, res) {
    var id = validator.trim(validator.escape(req.param('id')));
    var name = validator.trim(validator.escape(req.param('name')));
    var email = validator.trim(validator.escape(req.param('email')));
    var password = validator.trim(validator.escape(req.param('password')));
    var phone = validator.trim(validator.escape(req.param('phone')));

    userController.update(id, name, email, password, phone, function(resp) {
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