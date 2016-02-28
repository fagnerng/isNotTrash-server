//var myDb = 'mongodb://localhost:27017/test';
var db_string = 'mongodb://diego:diego182@ds055495.mongolab.com:55495/savefood';

var mongoose = require('mongoose').connect(db_string);

var db = mongoose.connection;
var ObjectId = mongoose.Schema.Types.ObjectId;


db.on('error', console.error.bind(console, 'Erro ao conectar no banco de dados'));

db.once('open', function(){

  /*Esquema do Json das promoçoes*/
  var promotionsSchema = mongoose.Schema({
    company:{
      name: String,
      subtitle: String
    },
    productName: String,
    price: {
      unit: String,
      actual: Number,
      old: Number
    },
    startDate: Date,
    endDate: Date,
    reason: String,
    shelf_life: Date,
    conservation: String,
    images: [String],
    evaluates: {
      user_likes: [ObjectId],
      comments: [
        {
          user_id: ObjectId,
          date: Date,
          text: String
        }
      ]
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
