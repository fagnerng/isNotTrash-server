var db_string = 'mongodb://127.0.0.1/isNotTrashTest'

var mongoose = require('mongoose').connect(db_string);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'Erro ao conectar no banco'));

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

  /*Esquema do Json dos usuários*/
  var userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    phone: String
  });

  exports.User = mongoose.model('User', userSchema);
  exports.promotions = mongoose.model('promotions', promotionsSchema);

});