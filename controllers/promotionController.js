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
	sort({_id: 1}).
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
	var findQuery = db.promotions.find({_id: {$gt: objectId, $ne: firstId}}).sort({_id :1});

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
	var updateQuery = db.promotions.update(
		{_id : params._id},
		{
			$push: {
				'evaluates.user_likes': params.user_id
			}
		},
		{new: true}
	);
	return new Promise(function(resolve, reject){
		updateQuery.exec(function(error, documents){
			if(error){
				reject({error: 'Não foi possível recomendar esse item'});
				console.log(error);
			}else{
				resolve(generateJson(documents));
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
		if(user_likes.contains(user_id)){
			promotions.like = true;
		}
		delete promotions[key].evaluates;
	}
}