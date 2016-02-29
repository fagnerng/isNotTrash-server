var db = require('../config/db_config.js');
var mongoose = require('mongoose');
var timeout = require('../resources/timeout/timeout.js');

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

exports.listByPage = function(user_id, skip, limit, callback){
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

exports.addLike = function(params, callback){
	var userId = mongoose.Types.ObjectId(params.user_id);
	var updateQuery = db.promotions.findOneAndUpdate(
		{_id : params.promotion_id},
		{
			$push: {
				'evaluates.user_likes': userId
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
	var userId = mongoose.Types.ObjectId(params.user_id);
	var updateQuery = db.promotions.findOneAndUpdate(
		{_id : params.promotion_id},
		{
			$pull: {
				'evaluates.user_likes': userId
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

exports.addPromotion = function(json){
	var insertQuery = db.promotions.insert(json);
	return new Promise(function(resolve, reject){
		insertQuery.exec(function(error, response){
			if(error){
				reject(error);
			} else {
				timeout.insertNewTimeout(json);
				resolve(response);
			}
		});
	});
};

function generateJson(user_id, promotions){
	for(var key in promotions){
		var user_likes = promotions[key].evaluates.user_likes;
		if(user_likes.indexOf(user_id) > -1){
			promotions[key]._doc.like = true;
		}
		promotions[key]._doc.likes = user_likes.length;
		promotions[key]._doc.ended = isEnded();
		delete promotions[key]._doc.evaluates;
	}
	return promotions;
}

function isEnded(date){
	return Date.now < new date;
}