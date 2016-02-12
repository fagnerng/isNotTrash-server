var express =  require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var index = require('./routes/index.js');
var promotions = require('./routes/promotion.js');
var users = require('./routes/user.js');
var app = express();

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

app.use('/', index);
app.use('/users', users);
app.use('/promotions', promotions);
