var express =  require('express');
var logger = require('morgan');
var bodyParser =  require('body-parser');

var app = module.exports = express();

var allowCors = function(req, res, next){
	res.header('Access-Control-Allow-Origin', '127.0.0.1:1337');
	res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
	res.header('Access-Control-Allow-Headers', "Content-Type");
	res.header('Access-Control-Allow-Credentials', 'true');

	next();
};

app.use(allowCors);

/*Serviço rodando na porta 1337*/
var ip = process.env.IP || 'localhost';
var port = process.env.PORT || 1337;

app.listen(port, function() {
    console.log('App is running on http://' + ip + ':' + port);
});

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
   extended: true
}));