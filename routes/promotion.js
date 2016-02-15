var express = require('express');
var router = express.Router();

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
  var id = validator.trim(validator.escape(req.params.id));

  console.log(id);

  promotionController.promotion(id, function(resp) {
      res.json(resp);
  });
});

/*Implementa serviço de requisição de produtos por página e por tamanho de página.*/
router.get('/pagination/:skip/:limit', function(req, res){
  var skip = validator.trim(validator.escape(req.params.skip));
  var limit = validator.trim(validator.escape(req.params.limit));

  promotionController.listByPage(skip, limit, function(resp) {
      res.json(resp);
  });
});

module.exports = router;