var db = require('../config/db_config.js');
var mongoose = require('mongoose');

exports.all = function(user_id){
	var findQuery = db.promotions.find().sort({_id: -1});
	return new Promise(function(resolve, reject){
		findQuery.exec(function(err, promotions){
			if (err) {
				reject({error: 'Não foi possível encontrar promoções'});
			} else {
				resolve(generateJson(user_id, promotions));
			}
		});
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

exports.listByPage = function(user_id, skip, limit){
	var promotions = db.promotions.find().
	sort({_id: -1}).
	skip(skip).
	limit(limit);

	return new Promise(function(resolve, reject){
		promotions.exec(function(error, promotions){
			if(error){
				reject({error: 'Não foi possível novas promoçoes'});
			}else{
				resolve(generateJson(user_id, promotions));
			}
		});	});

};

exports.listNewPromotions = function(user_id, firstId){
	var objectId = mongoose.Types.ObjectId(firstId);
	var findQuery = db.promotions.find({_id: {$gt: objectId, $ne: firstId}}).sort({_id :-1});

	return new Promise(function(resolve, reject){
		findQuery.exec(function(error, promotions){
			if(error){
				reject({error: 'Não foi possível novas promoçoes'});
				console.log(error);
			}else{
				resolve(generateJson(user_id, promotions));
			}
		});
	});

};

exports.addLike = function(params){
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
	return new Promise(function(resolve, reject){
		updateQuery.exec(function(error, document){
			if(error){
				reject({error: 'Não foi possível recomendar esse item'});
				console.log(error);
			}else{
				resolve(document);
			}
		});
	});

};

exports.removeLike = function(params){
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
	return new Promise(function(resolve, reject){
		updateQuery.exec(function(error, document){
			if(error){
				reject({error: 'Não foi possível recomendar esse item'});
				console.log(error);
			}else{
				resolve(document);
			}
		});
	});

};

exports.addComment = function(id, comment){
	//refatorar usando promises
	var updateQuery = db.promotions.update(
			{
				_id: id
			}, {
				$push: {
					"evaluates.comments": comment
				}
			});

	return new Promise(function(resolve, reject){
		updateQuery.exec(function(error, result){
			if(error){
				reject({error: 'Não foi possível recomendar esse item'});
				console.log(error);
			}else{
				resolve(result);
			}
		});
	});

};

exports.getComments = function(promotion_id){
	var queryFind = db.promotions.find({_id: promotion_id});

	return new Promise(function(resolve, reject){
		queryFind.exec(function(error, result){
			if(error){
				reject({error: 'Não foi possível recomendar esse item'});
				console.log(error);
			}else{
				resolve(result.evaluates.comments);
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
		delete promotions[key]._doc.evaluates;
	}
	return promotions;
}