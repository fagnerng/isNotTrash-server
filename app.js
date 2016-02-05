var express =  require('express');
var logger = require('morgan');
var bodyParser =  require('body-parser');
var index = require('./routes/index.js');

var app = express();

/*Serviço rodando na porta 1337*/
app.listen(1337);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
   extended: true
}));

app.use('/', index);

var userController = require('./routes/user.js');

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

/*Rota que retorna todos os usuários*/
app.get('/users', function(req, res) {
  userController.list(function(resp) {
    res.json(resp);
  });
});

/*Rota que retorna o usuário específico*/
app.get('/users/:id', function(req, res) {
  /*id ou name*/
  var id = req.param('id');
  userController.user(id, function(resp) {
    res.json(resp);
  });
});

/*Rota que cria um usuário*/
app.post('/users', function(req, res) {
  var name = req.param('name');
  var email = req.param('email');
  var password = req.param('password');
  userController.save(name, email, password, function(resp) {
    res.json(resp);
  });
});

/*Rota que atualiza um usuário*/
app.put('/users', function(req, res) {
  /*id eh necessario?*/
  var id = req.param('id');
  var name = req.param('name');
  var email = req.param('email');
  var password = req.param('password');
  userController.update(id, name, email, password, function(resp) {
    res.json(resp);
  });
});

/*Rota que deleta um usuário*/
app.delete('/users/:id', function(req, res) {
  /*id ou name*/
  var id = req.param('id');
  userController.delete(id, function(resp) {
    res.json(resp);
  });
});
