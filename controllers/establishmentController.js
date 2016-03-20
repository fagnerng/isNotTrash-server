var config = require('../config/config'),
  Establishment = require('../models/establishmentModel.js');

exports.query = (query, result) => {

  console.log(query);

  Establishment.find(query, (err, data) => {
    if (err) {
      result({
        "content": {
          "success": false,
          "data": err
        }
      });
    } else {
      result({
        "content": {
          "success": true,
          "data": data
        }
      });
    }
  });
};

exports.create = (name, city, result) => {

  var estab = new Establishment();

  estab.name = name;
  estab.city = city;

  estab.save((err, estab) => {
    if (err) {
      result({
        "content": {
          "success": false,
          "data": err
        }
      });
    } else {
      result({
        "content": {
          "success": true,
          "data": estab
        }
      });
    }
  });
};