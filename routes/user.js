var express = require('express');
var router = express.Router();

var userController = require('../controllers/userController.js');
var validator = require('validator');
var url = require('url');

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
    var json = url.parse(req.url, true).query;
    var id = validator.trim(validator.escape(json.id));

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

    var name = validator.trim(validator.escape(req.body.name));
    var email = validator.trim(validator.escape(req.body.email));
    var password = validator.trim(validator.escape(req.body.password));
    var phone = validator.trim(validator.escape(req.body.phone));

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
    var json = url.parse(req.url, true).query;

    var id = validator.trim(validator.escape(json.id));
    var name = validator.trim(validator.escape(json.name));
    var email = validator.trim(validator.escape(json.email));
    var password = validator.trim(validator.escape(json.password));
    var phone = validator.trim(validator.escape(json.phone));

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
    var json = url.parse(req.url, true).query;

    var id = validator.trim(validator.escape(json.id));
    userController.delete(id, function(resp) {
        if(resp.error !== undefined){
            res.send(resp, 404);
        } else {
            res.send(resp, 200);
        }
    });
});

module.exports = router;