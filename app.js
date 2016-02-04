var express =  require('express');

var app = express();

app.listen(5000);

app.get('/', function(req, res){

  res.end('Servidor On!');
});
