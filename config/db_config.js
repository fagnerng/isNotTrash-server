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
    oldValue: String,
    discount: String,
    start: String,
    end: String,
    reason: String,
    shelfLife: String,
    conservation: String,
    image: [String],
    likes: Number
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
