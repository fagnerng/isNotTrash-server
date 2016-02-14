var express = require('express');
var router = express.Router();

var userController = require('../controllers/userController.js');
var validator = require('validator');

/*Rota que retorna todos os usuários*/
router.get('/', function(req, res) {
    userController.list(function(resp) {
        res.json(resp);
    });
});

/*Rota que retorna o usuário específico*/
router.get('/:id', function(req, res) {
    var id = validator.trim(validator.escape(req.param('id')));

    userController.user(id, function(resp) {
        res.json(resp);
     });
});

/*Rota que cria um usuário*/
router.post('/', function(req, res) {
    var name = validator.trim(validator.escape(req.param('name')));
    var email = validator.trim(validator.escape(req.param('email')));
    var password = validator.trim(validator.escape(req.param('password')));

    userController.save(name, email, password, function(resp) {
        res.json(resp);
    });
});

/*Rota que atualiza um usuário*/
router.put('/', function(req, res) {
    var id = validator.trim(validator.escape(req.param('id')));
    var name = validator.trim(validator.escape(req.param('name')));
    var email = validator.trim(validator.escape(req.param('email')));
    var password = validator.trim(validator.escape(req.param('password')));
    userController.update(id, name, email, password, function(resp) {
        res.json(resp);
    });
});

/*Rota que deleta um usuário*/
router.delete('/:id', function(req, res) {
    var id = validator.trim(validator.escape(req.param('id')));
    userController.delete(id, function(resp) {
        res.json(resp);
    });
});

module.exports = router;