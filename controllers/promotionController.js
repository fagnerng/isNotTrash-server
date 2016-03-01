var db = require('../config/db_config.js');
var mongoose = require('mongoose');
var timeout = require('../resources/timeout/timeout.js');

exports.all = function(email, callback){
	var findQuery = db.promotions.find().sort({_id: -1});
	findQuery.exec(function(err, promotions){
		if (err) {
			callback({error: 'Não foi possível encontrar promoções'});
		} else {
			callback(generateResponse(email, promotions));
		}
	});
};

/*exports.listByExpiration = function(params){
 	var findQuery = db.promotions.find().sort({endDate: 1});

	findQuery.exec(function(error, promotions){
    	if(error){
      		callback({error: 'Não foi possível novas promoçoes'});
    	}else{
      		callback(promotions);
    	}
  	});
};*/

/*exports.promotion = function(promotion_id, callback){
 	var findQuery = db.promotions.findOne({_id:id});
	findQuery.exec(function(error, promotion){
		if(error){
			callback({error: 'Não foi possível encontrar a promocao'});
		}else{
			callback(promotion);
		}
	});
};*/

exports.listByPage = function(email, skip, limit, callback){
	var promotions = db.promotions.find().
	sort({_id: -1}).
	skip(skip).
	limit(limit);

	promotions.exec(function(error, promotions){
		if(error){
			callback({error: 'Não foi possível novas promoçoes'});
		}else{
			callback(generateResponse(email, promotions));
		}
	});

};

exports.listNewPromotions = function(email, firstId, callback){
	var objectId = mongoose.Types.ObjectId(firstId);
	var findQuery = db.promotions.find({_id: {$gt: objectId, $ne: firstId}}).sort({_id :-1});

	findQuery.exec(function(error, promotions){
		if(error){
			callback({error: 'Não foi possível novas promoçoes'});
			console.log(error);
		}else{
			callback(generateResponse(email, promotions));
		}
	});
};

exports.addLike = function(params, callback){
	var email = params.email;
	var updateQuery = db.promotions.findOneAndUpdate(
		{_id : params.promotion_id},
		{
			$push: {
				'evaluates.user_likes': email
			}
		},
		{new: true}
	);
	updateQuery.exec(function(error, document){
		if(error){
			callback({error: 'Não foi possível recomendar esse item'});
			console.log(error);
		}else{
			callback(document);
		}
	});

};

exports.removeLike = function(params, callback){
	var email = params.email;
	var updateQuery = db.promotions.findOneAndUpdate(
		{_id : params.promotion_id},
		{
			$pull: {
				'evaluates.user_likes': email
			}
		},
		{new: true}
	);
	updateQuery.exec(function(error, document){
		if(error){
			callback({error: 'Não foi possível recomendar esse item'});
			console.log(error);
		}else{
			callback(document);
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

exports.getComments = function(json, callback){

	var queryFind = db.promotions.find({_id: json.promotion_id});

	queryFind.exec(function(error, result){
		if(error){
			callback({error: 'Não foi possível recomendar esse item'});
			console.log(error);
		}else{
			callback(result.evaluates.comments);
		}
	});
};

exports.addPromotion = function(json, callback){
	var insertQuery = db.promotions.insert(json);
	insertQuery.exec(function(error, response){
		if(error){
			callback(error);
		} else {
			timeout.insertNewTimeout(json);
			callback(response);
		}
	});
};

function generateResponse(email, promotions){
	var response = [];
	for(var key in promotions){
		var doc = promotions[key];
		var item = {
			_id: doc._id,
			company: doc.company,
			productName: doc.productName,
			price: doc.price,
			startDate: doc.startDate,
			endDate: doc.endDate,
			reason: doc.reason,
			shelf_life: doc.shelf_life,
			conservation: doc.conservation,
			images: doc.images,
		};

		var user_likes = promotions[key].evaluates.user_likes;
		if(user_likes.indexOf(email) > -1){
			item.like = true;
		}
		item.likes = user_likes.length;
		item.ended = isEnded(item.endDate);

		response.push(item);
	}
	return response;
}

function isEnded(date){
	return Date.now() > new Date(date);
}