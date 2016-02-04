var express =  require('express');
var logger = require('morgan');
var bodyParser =  require('body-parser');
var index = require('./routes/index.js');

var app = express();

/*Serviço rodando na porta 5000*/
app.listen(1337);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
   extended: true
}));

app.use('/', index);

/*Rota que retorna todas as promoções do Banco de dados*/
app.get('/promotions', function(req, res){
  promotions.find({}, function(error, promotions){
    if(error){
      res.json({eror: 'Não foi possível encontrar o Usuário'});
    }else{
      res.json(promotions);
    }
  });
});



/*Rota que retorna as promoções ativas que tem a menor duração*/
app.get('/shorterPromotions', function(req, res){

  /*Valor das durações asc e limitado por 5 documentos*/
  var newestPromotions = promotions.find({isActive: true}).sort({'duration': 1}).limit(5);

  newestPromotions.exec(function(error, promotions){
    if(error){
      res.json({eror: 'Não foi possível novas promoçoes'});
    }else{
      res.json(promotions);
    }
  });
});
