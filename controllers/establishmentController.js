var config = require('../config/config'),
  Establishment = require('../models/establishmentModel.js');

exports.create = (name, city, result) => {

  console.log("Controller:");
  console.log("name: " + name);
  console.log("city: " + city);

  new Establishment({
    "name": name,
    "city": city
  }).save((err, estab) => {
    if (err) {
      console.log("Error:" + err);
      result({
        "status": 404,
        "msg": "error"
      });
    } else {
      result({
        "status": 201,
        "msg": "created"
      });
    }
  });
};
