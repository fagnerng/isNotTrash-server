var express = require('express');
var router = express.Router();
var url = require('url');

var promotionController = require('../controllers/promotionController.js');
var validator = require('validator');

/*Implementa método GET para recuperar todas as promoções*/
router.get('/', function(req, res){
    var params = url.parse(req.url, true).query;

    promotionController.all(params.user_id).then(function(resp) {
        res.json(resp);
    }).catch(function(error){
        res.json(error);
    });
});

/*Implementa algoritmo de ordenação dos produtos (por tempo de duração)*/
/*router.get('/sortByExpiration', function(req, res){
    var user_id = validator.trim(validator.escape(params.query.user_id));
  promotionController.listByExpiration(user_id, function(resp) {
      res.json(resp);
  });
});*/

/*Implementa método GET para recuperar uma promoção específica*/
/*router.get('/:id', function(req, res){
    var params = url.parse(req.url, true);
    var id = validator.trim(validator.escape(params.query.id));
    console.log(id);

    promotionController.promotion(id, function(resp) {
        res.json(resp);
    });
});*/

/*Implementa serviço de requisição de produtos por página e por tamanho de página.*/
router.get('/morePromotions', function(req, res){
    var urlParams = url.parse(req.url, true).query,
        skip = parseInt(validator.trim(validator.escape(urlParams.skip))),
        limit= parseInt(validator.trim(validator.escape(urlParams.limit))),
        user_id= validator.trim(validator.escape(urlParams.user_id));

    promotionController.listByPage(user_id, skip, limit).then(
        function(resp) {
            res.json(resp);
        }
    ).catch(
        function(error){
            res.json(error);
        }
    );
});


/*Implementa serviço de requisição de produtos por página e por tamanho de página. Fazer acontecer com webScoket*/
router.get('/newPromotions', function(req, res){
    var params = url.parse(req.url, true).query;
    var first = validator.trim(validator.escape(params.first));
    var user_id = validator.trim(validator.escape(params.user_id));
    if(!first){
        promotionController.all(user_id).then(
            function(resp) {
                res.json(resp);
            }
        ).catch(
            function(error){
                res.json(error);
            }
        );
    } else {
        promotionController.listNewPromotions(user_id, first).then(
            function(resp) {
                res.json(resp);
            }
        ).catch(
            function(error) {
                res.json(error);
            }
        );
    }

});

module.exports = router;