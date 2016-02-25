var myDb = 'mongodb://localhost:27017/test';
//var db_string = 'mongodb://diego:diego182@ds055495.mongolab.com:55495/savefood';

var mongoose = require('mongoose').connect(myDb);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'Erro ao conectar no banco de dados'));

db.once('open', function(){

  /*Esquema do Json das promoçoes*/
  var promotionsSchema = mongoose.Schema({
    company:{
      name: String,
      subtitle: String
    },
    productName: String,
    price: Number,
    old_price: Number,
    startDate: Number,
    endDate: Number,
    reason: String,
    shelf_life: Number,
    conservation: String,
    images: [String],
    evaluates: {
      user_likes: {},
      comments: []
    }
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

  //var insertValues = require('');

});
