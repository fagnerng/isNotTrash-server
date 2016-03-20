var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var establishmentSchema = new Schema({
  name: {
    type: String
  },
  city: {
    type: String
  }
});

module.exports = mongoose.model('Establishment', establishmentSchema);
