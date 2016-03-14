var express = require('express');
var router = express.Router();

var userController = require('../controllers/userController.js');
var validator = require('validator');
var url = require('url');

/*Rota que retorna o usuário específico ou todos os usuários */
router.get('/', function(req, res) {

    var query = req.query;

    userController.user(query,
        function(resp) {
            res.status(200).send(resp);
        },
        function(exception) {
            res.status(404).send(exception);
        }
    );
});

/*Rota que cria um usuário*/
router.post('/', function(req, res) {

    var name = validator.trim(validator.escape(req.body.name));
    var email = validator.trim(validator.escape(req.body.email));
    var password = validator.trim(validator.escape(req.body.password));
    var phone = validator.trim(validator.escape(req.body.phone));

    userController.save(name, email, password, phone, function(resp) {
        res.status(200).send(resp);
    }, function(exception) {
        res.status(400).send(exception);
    });
});

/*Rota que atualiza um usuário*/
router.put('/', function(req, res) {

    var name = validator.trim(validator.escape(req.body.name));
    var email = validator.trim(validator.escape(req.body.email));;
    var password = validator.trim(validator.escape(req.body.password));
    var phone = validator.trim(validator.escape(req.body.phone));

    userController.update(name, email, password, phone,
        function(resp) {
            res.status(200).send(resp);
        },
        function(exception) {
            res.status(400).send(exception);
        }
    );
});

/*Rota que deleta um usuário*/
router.delete('/:id', function(req, res) {
    var json = url.parse(req.url, true).query;

    var id = validator.trim(validator.escape(json.id));
    userController.delete(id, function(resp) {
        res.status(200).send(resp);
    }, function(exception) {
        res.status(404).send(404);
    });
});

module.exports = router;