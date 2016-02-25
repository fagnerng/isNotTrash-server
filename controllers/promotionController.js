var db = require('../config/db_config.js');
var mongoose = require('mongoose');

exports.all = function(user_id, callback){
	var findQuery = db.promotions.find().sort({_id: -1});

	findQuery.exec(function(err, promotions){
		if (err) {
			callback({error: 'Não foi possível encontrar promoções'});
		} else {
			callback(generateJson(user_id, promotions));
		}
	});
};

exports.listByExpiration = function(user_id, callback){
	/*Valor das durações asc*/
 	var findQuery = db.promotions.find().sort({endDate: 1});

	findQuery.exec(function(error, promotions){
    	if(error){
      		callback({error: 'Não foi possível novas promoçoes'});
    	}else{
      		callback(promotions);
    	}
  	});
};

exports.promotion = function(promotion_id, callback){
 	var findQuery = db.promotions.findOne({_id:id});
	findQuery.exec(function(error, promotion){
		if(error){
			callback({error: 'Não foi possível encontrar a promocao'});
		}else{
			callback(promotion);
		}
	});
};

exports.listByPage = function(urlParams, callback){
	var skip = parseInt(validator.trim(validator.escape(urlParams.query.skip))),
		limit= parseInt(validator.trim(validator.escape(urlParams.query.limit))),
		user_id= validator.trim(validator.escape(urlParams.query.user_id));

	var promotions = db.promotions.find().
	sort({_id: -1}).
	skip(skip).
	limit(limit);
	
  	promotions.exec(function(error, promotions){
   		if(error){
    		callback({error: 'Não foi possível novas promoçoes'});
    	}else{
    		callback(generateJson(user_id, promotions));
    	}
  	});
};

exports.listNewPromotions = function(user_id, firstId, callback){
	var objectId = mongoose.Types.ObjectId(firstId);
	var findQuery = db.promotions.find({_id: {$gt: objectId, $ne: firstId}}).sort({_id :-1});

	findQuery.exec(function(error, promotions){
		if(error){
			callback({error: 'Não foi possível novas promoçoes'});
			console.log(error);
		}else{
			callback(generateJson(user_id, promotions));
		}
	});
};

exports.addLike = function(params,  callback){
	var updateQuery = db.promotions.update(
		{_id : params._id},
		{
			$push: {
				'evaluates.user_likes': params.user_id
			}

		},
		{new: true}
	);
	updateQuery.exec(function(error, documents){
		if(error){
			callback({error: 'Não foi possível recomendar esse item'});
			console.log(error);
		}else{
			callback(generateJson(documents));
		}
	});
};


exports.addComment = function(id, comment, callback){
	//refatorar usando promises
	var updateQuery = db.promotions.update(
			{
				_id: id
			}, {
				$push: {
					"evaluates.comments": comment
				}
			});
	updateQuery.exec(function(error, result){
		if(error){
			callback({error: 'Não foi possível recomendar esse item'});
			console.log(error);
		}else{
			callback(result);
		}
	});
};

exports.getComments = function(promotion_id, callback){
	var queryFind = db.promotions.find({_id: promotion_id});
	queryFind.exec(function(error, result){
		if(error){
			callback({error: 'Não foi possível recomendar esse item'});
			console.log(error);
		}else{
			callback(result.evaluates.comments);
		}
	});
};

function generateJson(user_id, promotions){
	for(var key in promotions){
		var user_likes = promotions[key].evaluates.user_likes;
		if(user_likes.contains(user_id)){
			promotions.like = true;
		}
		delete promotions[key].evaluates;
	}
};