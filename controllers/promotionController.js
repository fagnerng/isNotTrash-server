var db = require('../config/db_config.js');
var mongoose = require('mongoose');

exports.all = function(callback){
	var findQuery = db.promotions.find().sort({_id: -1});

	findQuery.exec(function(err, promotions){
		if (err) {
			callback({error: 'Não foi possível encontrar promoções'});
		} else {
			callback(promotions);
		}
	});
};

exports.listByExpiration = function(callback){
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

exports.promotion = function(id, callback){
 	var findQuery = db.promotions.findOne({_id:id});
	findQuery.exec(function(error, promotion){
		if(error){
			callback({error: 'Não foi possível encontrar a promocao'});
		}else{
			callback(promotion);
		}
	});
};

exports.listByPage = function(skip, limit, callback){
	var promotions = db.promotions.find().
	sort({_id: -1}).
	skip(skip).
	limit(limit);
	
  	promotions.exec(function(error, promotions){
   		if(error){
    		callback({error: 'Não foi possível novas promoçoes'});
    	}else{
    		callback(promotions);
    	}
  	});
};

exports.listNewPromotions = function(firstId, callback){
	var objectId = mongoose.Types.ObjectId(firstId);
	var findQuery = db.promotions.find({_id: {$gt: objectId, $ne: firstId}}).sort({_id :-1});

	findQuery.exec(function(error, promotions){
		if(error){
			callback({error: 'Não foi possível novas promoçoes'});
			console.log(error);
		}else{
			callback(promotions);
		}
	});
};

exports.addLike = function(params,  callback){
	//refatorar usando promises
	var modifyObject = {};
	modifyObject[params.user_id] = true;
	var updateQuery = db.promotions.update(
		{_id : params._id},
		{
			evaluates: {
				user_likes: {
					$set: modifyObject
				}
			}

		}
		//{new: true}
	);
	updateQuery.exec(function(error, documents){
		if(error){
			callback({error: 'Não foi possível recomendar esse item'});
			console.log(error);
		}else{
			callback(documents);
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