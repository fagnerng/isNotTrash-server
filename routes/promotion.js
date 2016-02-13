var express = require('express');
var router = express.Router();
var db = require('../db_config');


/*Rota que retorna todas as promoções do Banco de dados*/
router.get('/', function(req, res){
  db.promotions.find({isActive: true}, function(error, promotions){
    if(error){
      res.json({error: 'Não foi possível encontrar promoções'});
    }else{
      res.json(promotions);
    }
  });
});

/*Rota que retorna as promoções ativas que tem a menor duração*/
router.get('/sortByExpiration', function(req, res){

  /*Valor das durações asc*/
  var newestPromotions = db.promotions.find({isActive: true}).sort({'duration': 1}).limit(5);

  newestPromotions.exec(function(error, promotions){
    if(error){
      res.json({error: 'Não foi possível novas promoçoes'});
    }else{
      res.json(promotions);
    }
  });
});

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

module.exports = router;