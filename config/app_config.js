var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');

var app = module.exports = express();

var server = require('http').createServer(app);
var io = require('../resources/web_socket/WebSocket.js');

/*Serviço rodando na porta 1337*/
var ip = process.env.IP || 'localhost';
var port = process.env.PORT || 1337;

server.listen(port, () => {
	console.log('App is running on http://' + ip + ':' + port);
});

io.attach(server);

var allowCors = (req, res, next) => {
	res.header('Access-Control-Allow-Origin', 'http://localhost:8100');
	res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
	res.header('Access-Control-Allow-Headers', "Content-Type");
	res.header('Access-Control-Allow-Credentials', 'true');

	next();
};

app.use(allowCors);

if (process.env.NODE_ENV === 'dev') {
	app.use(logger('dev'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));