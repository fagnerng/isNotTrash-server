var express = require('express');
var router = express.Router();
var db = require('../db_config');

/*Rota que retorna todas as promoções do Banco de dados*/
router.get('/', function(req, res){
  db.promotions.find({isActive: true}, function(error, promotions){
    if(error){
      res.json({eror: 'Não foi possível encontrar o Usuário'});
    }else{
      res.json(promotions);
    }
  });
});

/*Rota que retorna as promoções ativas que tem a menor duração*/
router.get('/shorter', function(req, res){

  /*Valor das durações asc e limitado por 5 documentos*/
  var newestPromotions = db.promotions.find({isActive: true}).sort({'duration': 1}).limit(5);

  newestPromotions.exec(function(error, promotions){
    if(error){
      res.json({eror: 'Não foi possível novas promoçoes'});
    }else{
      res.json(promotions);
    }
  });
});

module.exports = router;
