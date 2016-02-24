var db = require('../config/db_config.js');
var mongoose = require('mongoose');

exports.list = function(callback){
	db.promotions.find({"$where": 'new Date(this.endDate) > new Date()'},function(err, promotions){
		if (err) {
			callback({error: 'Não foi possível encontrar promoções'});
		} else {
			callback(promotions);
		}
	});
};

exports.all = function(callback){
	db.promotions.find({},function(err, promotions){
		if (err) {
			callback({error: 'Não foi possível encontrar promoções'});
		} else {
			callback(promotions);
		}
	});
};

exports.listByExpiration = function(callback){
	/*Valor das durações asc*/
 	var newestPromotions = db.promotions.find({"$where": 'new Date(this.endDate) > new Date()'}).sort({'endDate': 1});

 	newestPromotions.exec(function(error, promotions){
    	if(error){
      		callback({error: 'Não foi possível novas promoçoes'});
    	}else{
      		callback(promotions);
    	}
  	});
};

exports.promotion = function(id, callback){
 	db.promotions.findOne({_id:id}, function(error, promotion){
    	if(error){
      		callback({error: 'Não foi possível encontrar a promocao'});
    	}else{
      		callback(promotion);
    	}
  	});	
};

exports.listByPage = function(skip, limit, callback){
	var promotions = db.promotions.find().sort({_id: -1}).skip(skip).limit(limit);
	
  	promotions.exec(function(error, promotions){
   		if(error){
    		callback({error: 'Não foi possível novas promoçoes'});
    	}else{
    		callback(promotions);
    	}
  	});
};

exports.listNewPromotions = function(first, callback){

	var objectId = mongoose.Types.ObjectId(first);
	var promotions = db.promotions.find({_id: {$gt: objectId, $ne: first}}).sort({_id :-1});

	promotions.exec(function(error, promotions){
		if(error){
			callback({error: 'Não foi possível novas promoçoes'});
			console.log(error);
		}else{
			callback(promotions);
		}
	});
};

exports.updateTotalLikes = function(id, totalLikes, callback){
	//refatorar usando promises
	var update = db.promotions.update(
		{_id : id},
		{
			$set: {
				"evaluates.likes": totalLikes
			}
		}
	);
	update.exec(function(error, result){
		if(error){
			callback({error: 'Não foi possível recomendar esse item'});
			console.log(error);
		}else{
			callback(result);
		}
	});
};

exports.addComment = function(id, comment, callback){
	//refatorar usando promises
	var update = db.promotions.update(
			{
				_id: id
			}, {
				$push: {
					"evaluates.comments": comment
				}
			});
	update.exec(function(error, result){
		if(error){
			callback({error: 'Não foi possível recomendar esse item'});
			console.log(error);
		}else{
			callback(result);
		}
	});
};