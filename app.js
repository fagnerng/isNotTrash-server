var express =  require('express');
var logger = require('morgan');
var bodyParser =  require('body-parser');
var index = require('./routes/index.js');
var promotions = require('./routes/promotion.js');
var app = express();

/*Serviço rodando na porta 1337*/
app.listen(1337);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
   extended: true
}));

app.use('/', index);
app.use('/promotions', promotions);
var userController = require('./routes/user.js');


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
