var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var establishmentSchema = new Schema({
  name:{
    type: String,
    required: true
  },
  type:{
    type: String,
    required: true
  },
  imageUrl: {
    type: String
  },
  subtitle: {
    type: String
  },
  cnpj: {
    type : String
  },
  phones:{
     type: [String],
     required: true
  },
  address: {
    street:{
      type: String,
      required: true
    },
    neighborhood: {
      type: String,
      required: true
    },
    number: {
      type: Number,
    },
    cep: {
      type: String
    }
  }
});

module.exports = mongoose.model('Establishment', establishmentSchema);
