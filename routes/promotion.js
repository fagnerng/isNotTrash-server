var express = require('express');
var router = express.Router();
var url = require('url');

var promotionController = require('../controllers/promotionController.js');
var validator = require('validator');

/*Implementa método GET para recuperar todas as promoções*/
router.get('/', function(req, res){
    var params = url.parse(req.url, true).query;

    promotionController.all(req.body.user_id,
        function(resp) {
            res.json(resp);
        }
    );
});

/*Implementa serviço de requisição de produtos por página e por tamanho de página.*/
router.get('/morePromotions', function(req, res){

    var skip = parseInt(validator.trim(validator.escape(req.body.skip)));
    var limit = parseInt(validator.trim(validator.escape(req.body.limit)));
    var user_id = validator.trim(validator.escape(req.body.user_id));

    promotionController.listByPage(user_id, skip, limit,
        function(resp) {
            res.json(resp);
        }
    )
});

/*Implementa serviço de requisição de produtos por página e por tamanho de página. Fazer acontecer com webScoket*/
router.get('/newPromotions', function(req, res){

    var first = validator.trim(validator.escape(req.body.first));
    var user_id = validator.trim(validator.escape(req.body.user_id));

    if(!first){
        promotionController.all(user_id,
            function(resp) {
                res.json(resp);
            }
        );
    } else {
        promotionController.listNewPromotions(user_id, first,
            function(resp) {
                res.json(resp);
            }
        );
    }
});

module.exports = router;