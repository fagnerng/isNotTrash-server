var express = require('express');
var router = express.Router();
var db = require('../db_config');

/*Implementa método GET para recuperar promoções*/
router.get('/', function(req, res){
  db.promotions.find({isActive: true}, function(error, promotions){
    if(error){
      res.json({error: 'Não foi possível encontrar promoções'});
    }else{
      res.json(promotions);
    }
  });
});

/*Implementa algoritmo de ordenação dos produtos (por tempo de duração)*/
router.get('/sortByExpiration', function(req, res){

  /*Valor das durações asc*/
  var newestPromotions = db.promotions.find({isActive: true}).sort({'duration': 1});

  newestPromotions.exec(function(error, promotions){
    if(error){
      res.json({error: 'Não foi possível novas promoçoes'});
    }else{
      res.json(promotions);
    }
  });
});

/*Implementa método GET para recuperar uma promoção específica*/
router.get('/:id', function(req, res){

  var id = req.params.id;

  console.log(id);

  db.promotions.findOne({_id:id}, function(error, promotion){

    if(error){
      res.json({error: 'Não foi possível encontrar a promocao'});
    }else{
      res.json(promotion);
    }
  });
});

/*Implementa serviço de requisição de produtos por página e por tamanho de página.*/
router.get('/pagination/:skip/:limit', function(req, res){

  var skip = req.params.skip;
  var limit = req.params.limit;

  var promotions = db.promotions.find({isActive: true}).sort({'duration': 1, 'start': 1}).skip(skip).limit(limit);

  promotions.exec(function(error, promotions){
    if(error){
      res.json({error: 'Não foi possível novas promoçoes'});
    }else{
      res.json(promotions);
    }
  });
});

module.exports = router;