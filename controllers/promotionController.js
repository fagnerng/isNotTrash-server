var db = require('../config/db_config');

exports.list = function(callback){
	db.promotions.find({isActive: true}, function(error, promotions){
    	if(error){
      		callback({error: 'Não foi possível encontrar promoções'});
    	}else{
    		callback(promotions);
    	}
  	});
};

exports.listByExpiration = function(callback){
	/*Valor das durações asc*/
 	var newestPromotions = db.promotions.find({isActive: true}).sort({'duration': 1});

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
	var promotions = db.promotions.find({isActive: true}).sort({'duration': 1, 'start': 1}).skip(skip).limit(limit);
	
  	promotions.exec(function(error, promotions){
   		if(error){
    		callback({error: 'Não foi possível novas promoçoes'});
    	}else{
    		callback(promotions);
    	}
  	});
};