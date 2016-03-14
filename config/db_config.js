var config = require("./config");
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

if (process.env.PORT) {
  db_string = 'mongodb://diego:diego182@ds055495.mongolab.com:55495/savefood';
}

if (process.env.NODE_ENV == 'test') {
  mongoose.connect(config.mongo_uri.test);
} else if (process.env.NODE_ENV == 'dev') {
  mongoose.connect(config.mongo_uri.dev);
}

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'Erro ao conectar no banco de dados'));

//db.once('open', console.error.bind(console, 'Conexao com banco de dados aberta'));