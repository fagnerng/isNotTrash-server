var express = require('express');
var router = express.Router();

var promotionController = require('../controllers/promotionController.js');
var validator = require('validator');

const DEFAULT_SKIP = 0;
const DEFAULT_LIMIT = 10;

/*Implementa método GET para recuperar todas as promoções*/
router.post('/', function(req, res){
    var user_id = req.userInformations._id;

    promotionController.all(user_id,
        function(resp) {
            res.json(resp);
        }, function(exception){}
    );
});

/*Implementa serviço de requisição de produtos por página e por tamanho de página.*/
router.post('/oldPromotions', function(req, res){

    var skip = parseInt(validator.trim(validator.escape(req.body.skip)));
    var limit = parseInt(validator.trim(validator.escape(req.body.limit)));
    var user_id = req.userInformations._id;

    promotionController.listByPage(skip, limit, user_id,
        function(resp) {
            res.json(resp);
        }, function(exception){}
    );
});

/*Implementa serviço de requisição de produtos por página e por tamanho de página. Fazer acontecer com webScoket*/
router.post('/newPromotions', function(req, res){

    var first = validator.trim(validator.escape(req.body.first));
    var user_id = validator.trim(validator.escape(req.userInformations._id));
    var limit = validator.trim(validator.escape(req.body.limit));

    if(!first){
        promotionController.all(user_id, limit,
            function(resp) {
                res.json(resp);
            }, function(exception){}
        );
    } else {
        promotionController.listNewPromotions(first, user_id, limit,
            function(resp) {
                res.json(resp);
            }, function(exception){}
        );
    }
});

router.post('/addPromotion', function(req, res){

    var promotion_id = validator.trim(validator.escape(req.body.promotion_id));
    var text = validator.trim(validator.escape(req.body.text));
    var email = req.body.first;

    promotionController.addPromotion(req.body,
        function(resp){
            res.json(resp);
        }, function(exception){}
    );
});

router.post('/oldComments', function(req, res){
    var skip = validator.trim(validator.escape(req.body.skip));
    var limit = validator.trim(validator.escape(req.body.limit));
    var promotion_id = validator.trim(validator.escape(req.body.promotion_id));
    promotionController.getOldComments(skip, limit, promotion_id,
        function(resp){
            res.json(resp);
        }, function(exception){}
    );
});

router.post('/newComments', function(req, res){
    var promotion_id = validator.trim(validator.escape(req.body.promotion_id));
    var comment_date = validator.trim(validator.escape(req.body.comment_date));
    if(!comment_date){
        promotionController.getOldComments(DEFAULT_SKIP, DEFAULT_LIMIT, promotion_id,
            function(resp){
                res.json(resp);
            }, function(exception){}
        );
    } else {
        promotionController.getNewComments(promotion_id, comment_date,
            function(resp){
                res.json(resp);
            }, function(exception){}
        );
    }
});

module.exports = router;