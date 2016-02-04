var express =  require('express');
var logger = require('morgan');
var bodyParser =  require('body-parser');

var app = express();

var db_string = 'mongodb://diego:diego182@ds055495.mongolab.com:55495/savefood';

var mongoose = require('mongoose').connect(db_string);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'Erro ao conectar no banco de dados'));

db.once('open', function(){

  /*Esquema do Json das promoçoes*/
  var promotionsSchema = mongoose.Schema({
    name: String,
    company: String,
    value: String,
    duration: String,
    start: Date,
    end: Date,
    reason: String,
    shelf_life: Date,
    conservation: String,
    isActive: Boolean
  });

  promotions = mongoose.model('promotions', promotionsSchema);

});

/*Serviço rodando na porta 5000*/
app.listen(5000);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
   extended: true
}));

/*Rota padrão '/' verifica se o servidor está online*/
app.get('/', function(req, res){
  res.end('Servidor On!');
});

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
