var express = require('express');
var router = express.Router();

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
    var user_id = req.decoded._id;

    promotionController.listByPage(skip, limit, user_id,
        function(resp) {
            res.json(resp);
        }
    );
});

/*Implementa serviço de requisição de produtos por página e por tamanho de página. Fazer acontecer com webScoket*/
router.post('/newPromotions', function(req, res){

    var first = validator.trim(validator.escape(req.body.first));
    var user_id = validator.trim(validator.escape(req.decoded._id));

    if(!first){
        promotionController.all(email,
            function(resp) {
                res.json(resp);
            }
        );
    } else {
        promotionController.listNewPromotions(first, user_id,
            function(resp) {
                res.json(resp);
            }
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
        }
    );
});

router.post('/oldComments', function(req, res){
    var skip = validator.trim(validator.escape(req.body.skip));
    var limit = validator.trim(validator.escape(req.body.limit));
    var promotion_id = validator.trim(validator.escape(req.body.promotion_id));
    promotionController.getOldComments(skip, limit, promotion_id,
        function(resp){
            res.json(resp);
        }
    );
});
//{user:{}, comment:{}}

router.post('/newComments', function(req, res){
    var promotion_id = validator.trim(validator.escape(req.body.promotion_id));
    var commentDate = validator.trim(validator.escape(req.body.comment_date));

    promotionController.getNewComments(promotion_id, commentDate,
        function(resp){
            res.json(resp);
        }
    );
});

router.post('/addComment', function(req, res){
    var promotion_id = validator.trim(validator.escape(req.body.promotion_id));
    var comment = req.body.comment;
    comment._user = req.decoded._id;
    promotionController.addComment(promotion_id, comment,
        function(resp){
            res.json(resp);
        }
    );
});


module.exports = router;