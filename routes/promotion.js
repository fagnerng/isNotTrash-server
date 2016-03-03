var express = require('express');
var router = express.Router();
var url = require('url');

var promotionController = require('../controllers/promotionController.js');
var validator = require('validator');

/*Implementa método GET para recuperar todas as promoções*/
router.post('/', function(req, res){
    var email = req.decoded;

    promotionController.all(email,
        function(resp) {
            res.json(resp);
        }
    );
});

/*Implementa serviço de requisição de produtos por página e por tamanho de página.*/
router.post('/oldPromotions', function(req, res){

    var skip = parseInt(validator.trim(validator.escape(req.body.skip)));
    var limit = parseInt(validator.trim(validator.escape(req.body.limit)));
    var email = req.decoded;

    promotionController.listByPage(email, skip, limit,
        function(resp) {
            res.json(resp);
        }
    );
});

/*Implementa serviço de requisição de produtos por página e por tamanho de página. Fazer acontecer com webScoket*/
router.post('/newPromotions', function(req, res){

    var first = validator.trim(validator.escape(req.body.first));
    var email = validator.trim(validator.escape(req.decoded));

    if(!first){
        promotionController.all(email,
            function(resp) {
                res.json(resp);
            }
        );
    } else {
        promotionController.listNewPromotions(email, first,
            function(resp) {
                res.json(resp);
            }
        );
    }
});

router.post('/addPromotion', function(req, res){
    var json = url.parse(req.url, true).query;
    promotionController.addPromotion(json,
        function(resp){
            res.json(resp);
        }
    );
});

router.post('/oldComments', function(req, res){
    var params = url.parse(req.url, true).query;
    promotionController.getComments(params,
        function(resp){
            res.json(resp);
        }
    );
});
//{user:{}, comment:{}}

router.post('/newComments', function(req, res){
    var params = url.parse(req.url, true).query;
    //user_id
    promotionController.getComments(params,
        function(resp){
            res.json(resp);
        }
    );
});


module.exports = router;