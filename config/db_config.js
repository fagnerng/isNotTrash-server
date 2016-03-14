if (process.env.PORT) {
  db_string = 'mongodb://diego:diego182@ds055495.mongolab.com:55495/savefood';
}

var mongoose = require('mongoose');

var bcrypt = require('bcrypt-nodejs');

console.log("NODE_ENV: " + process.env.NODE_ENV);

var environment = "" + process.env.NODE_ENV || 'dev';

console.log('environment: ' + environment);

console.log(environment == 'test');

if (environment == 'test') {
  mongoose.connect('mongodb://localhost/isnottrash-test');
  console.log("test");
} else if (environment == 'production') {
  mongoose.connect('mongodb://localhost/isnottrash');
  console.log("dev");
}

mongoose.connect('mongodb://localhost/isnottrash');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'Erro ao conectar no banco de dados'));

db.once('open', console.error.bind(console, 'Conexao com banco de dados aberta'));