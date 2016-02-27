var db_string = 'mongodb://localhost/isnottrash';

if(process.env.PORT){
  db_string = 'mongodb://diego:diego182@ds055495.mongolab.com:55495/savefood';
}

var mongoose = require('mongoose').connect(db_string);
var bcrypt = require('bcrypt-nodejs');

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
      likes: Number,
      comments: []
    }
  });

/*Esquema dos Usuários*/
var userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  phone:{
    type: String,
    unique: true
  } 
});

/*Antes de salvar o usuário, usa criptografia na sua senha*/
userSchema.pre('save', function(next){

  var user = this;

  bcrypt.genSalt(5, function(err, salt) {

    if(err) return next(err);

    bcrypt.hash(user.password, salt, null, function(err, hash) {

      if(err) return next(err);

      user.password = hash;

      next();

    });
  });
});

userSchema.methods.passwordVerification = function(password, next){
  bcrypt.compare(password, this.password, function(err, isMatch){
    if(err) return next(err);
    next(isMatch);
  });
};

exports.User = mongoose.model('User', userSchema);
exports.promotions = mongoose.model('promotions', promotionsSchema);

});
