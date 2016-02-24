var express = require('express');
var router = express.Router();
var url = require('url');

var promotionController = require('../controllers/promotionController.js');
var validator = require('validator');



/*Implementa método GET para recuperar promoções*/
router.get('/', function(req, res){
  promotionController.list(function(resp) {
      res.json(resp);
    });
});

/*Implementa método GET para recuperar todas as promoções*/
router.get('/all', function(req, res){
    promotionController.all(function(resp) {
        res.json(resp);
    });
});

/*Implementa algoritmo de ordenação dos produtos (por tempo de duração)*/
router.get('/sortByExpiration', function(req, res){
  promotionController.listByExpiration(function(resp) {
      res.json(resp);
  });
});

/*Implementa método GET para recuperar uma promoção específica*/
router.get('/:id', function(req, res){
    var params = url.parse(req.url, true);
    var id = validator.trim(validator.escape(params.query.id));
    console.log(id);

    promotionController.promotion(id, function(resp) {
        res.json(resp);
    });
});

/*Implementa serviço de requisição de produtos por página e por tamanho de página.*/
router.get('/pagination/:skip/:limit', function(req, res){
    var params = url.parse(req.url, true);
    var skip = parseInt(validator.trim(validator.escape(params.query.skip)));
    var limit = parseInt(validator.trim(validator.escape(params.query.limit)));

    promotionController.listByPage(skip, limit, function(resp) {
      res.json(resp);
    });
});


/*Implementa serviço de requisição de produtos por página e por tamanho de página. Fazer acontecer com webScoket*/
router.get('/updateTimeLine/:first', function(req, res){
    var params = url.parse(req.url, true);
    var first = validator.trim(validator.escape(params.query.first));
    if(!first){
        promotionController.all(function(resp) {
            res.json(resp);
        });
    } else {
        promotionController.listNewPromotions(first, function(resp) {
            res.json(resp);
        });
    }

});

module.exports = router;