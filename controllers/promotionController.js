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
	var promotions = db.promotions.find({"$where": 'new Date(this.endDate) >= new Date()'}).
	sort({'startDate': -1, 'endDate': -1}).
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

exports.listNewPromotions = function(first, callback){

	/*timestamp = first.toString().substring(0,8);
	var date = new Date( parseInt( timestamp, 16 ) * 1000 );*/

	//var query = 'this._id > ' + first;
	var objectId = mongoose.Types.ObjectId(first);
	var promotions = db.promotions.find({_id: {$gt: objectId}}).sort({_id :-1});

	promotions.exec(function(error, promotions){
		if(error){
			callback({error: 'Não foi possível novas promoçoes'});
			console.log(error);
		}else{
			callback(promotions);
		}
	});
};

exports.updateTotalLikes = function(id, totalLikes){
	var r =  db.promotions.updateOne({_id : id}, {$set: {likes : totalLikes}});
	/*function(response){
		console.log("recomendação realizada com sucesso! " + response);
	}*/
};

exports.addComment = function(id, comment){
	return db.promotions.updateOne(
			{
				_id: id
			}, {
				$push: {
					evaluates: {
						comments: comment
					}
				}
			});
};