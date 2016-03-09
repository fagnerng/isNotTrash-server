var express = require('express');
var router = express.Router();

var userController = require('../controllers/userController.js');
var validator = require('validator');
var url = require('url');

/*Rota que retorna todos os usuários*/
router.get('/', function(req, res) {
    userController.list(
        function(resp) {
            res.send(resp, 200);
        }, function(exception){
            res.send(exception, 404);
        }
    );
});

/*Rota que retorna o usuário específico*/
router.get('/:id', function(req, res) {
    var json = url.parse(req.url, true).query;
    var id = validator.trim(validator.escape(json.id));

    userController.user(id,
        function(resp) {
            res.send(resp, 200);
        },
        function(exception) {
            res.send(exception, 404);
        }
    );
});

/*Rota que cria um usuário*/
router.post('/', function(req, res) {

    var name = validator.trim(validator.escape(req.body.name));
    var email = validator.trim(validator.escape(req.body.email));
    var password = validator.trim(validator.escape(req.body.password));
    var phone = validator.trim(validator.escape(req.body.phone));

    userController.save(name, email, password,phone, function(resp) {
            res.send(resp, 200);
        }, function(exception){
            res.send(exception, 400);
        }
    );
});

/*Rota que atualiza a senha do usuário*/
router.put('/setPassword', function(req, res) {
    var email = validator.trim(validator.escape(req.param('email')));
    var password = validator.trim(validator.escape(req.param('password')));

    userController.setPassord(email,password, function(resp) {
            res.send(resp, 200);
        }, function(exception){
            res.send(exception, 400);
        }
    );
});

/*Rota que atualiza os dados do usuário*/
router.put('/', function(req, res) {
    var email = validator.trim(validator.escape(req.param('email')));
    var name = validator.trim(validator.escape(req.param('name')));
    var newEmail = validator.trim(validator.escape(req.param('newEmail')));
    var phone = validator.trim(validator.escape(req.param('phone')));
    var language = validator.trim(validator.escape(req.param('language')));

    userController.update(email, name, newEmail, phone,language, function(resp) {
            res.send(resp, 200);
        }, function(exception){
            res.send(exception, 400);
        }
    );
});

/*Rota que deleta um usuário*/
router.delete('/:id', function(req, res) {
    var json = url.parse(req.url, true).query;

    var id = validator.trim(validator.escape(json.id));
    userController.delete(id, function(resp) {
            res.send(resp, 200);
        }, function(exception){
            res.send(exception, 404);
        }
    );
});

module.exports = router;