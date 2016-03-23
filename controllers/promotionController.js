var timeout = require('../resources/timeout/timeout.js');

var Promotion = require('../models/promotion.js');

exports.all = function(user_id, callback, reject) {

	var findQuery = Promotion.find().sort({
		_id: -1
	});

	findQuery.exec(function(err, promotions) {
		if (err) {
			reject({
				error: 'Não foi possível encontrar promoções'
			});
		} else {
			callback(generateResponse(user_id, promotions));
		}
	});
};

/*exports.listByExpiration = function(params){
 	var findQuery = Promotions.find().sort({endDate: 1});

	findQuery.exec(function(error, promotions){
    	if(error){
      		callback({error: 'Não foi possível novas promoçoes'});
    	}else{
      		callback(promotions);
    	}
  	});
};*/

/*exports.promotion = function(promotion_id, callback){
 	var findQuery = Promotions.findOne({_id:id});
	findQuery.exec(function(error, promotion){
		if(error){
			callback({error: 'Não foi possível encontrar a promocao'});
		}else{
			callback(promotion);
		}
	});
};*/

exports.listByPage = function(skip, limit, user_id, resolve, reject) {
	var promotions = Promotion.find()
	.populate('_company')
	.sort({
		_id: -1
	})
	.skip(skip)
	.limit(limit);

	promotions.exec(function(error, promotions) {
		if (error) {
			reject({
				error: 'Não foi possível novas promoçoes'
			});
		} else {
			resolve(generateResponse(user_id, promotions));
		}
	});
};


exports.listNewPromotions = function(firstPromotionId, user_id, limit, resolve, reject) {
	var objectId = mongoose.Types.ObjectId(firstPromotionId);
	var findQuery = db.Promotion.find({
		_id: {
			$gt: objectId,
			$ne: firstPromotionId
		}
	}).populate('_company')
	.sort({
		_id: 1
	}).limit(parseInt(limit));

	findQuery.exec(function(error, promotions) {
		if (error) {
			reject({
				error: 'Não foi possível novas promoçoes'
			});
			console.log(error);
		} else {
			resolve(generateResponse(user_id, promotions));
		}
	});
};

exports.addLike = function(params, resolve, reject) {
	var id = params.user_informations._id;
	var updateQuery = Promotion.findOneAndUpdate({
		_id: params.promotion_id
	}, {
		$push: {
			'evaluates.user_likes': id
		}
	}, {
		new: true
	});
	updateQuery.exec(function(error, document) {
		if (error) {
			reject({
				error: 'Não foi possível recomendar esse item'
			});
			console.log(error);
		} else {
			resolve(document);
		}
	});

};

exports.removeLike = function(params, resolve, reject) {
	var user_id = params.user_informations._id;
	var updateQuery = Promotion.findOneAndUpdate({
		_id: params.promotion_id
	}, {
		$pull: {
			'evaluates.user_likes': user_id
		}
	}, {
		new: true
	});
	updateQuery.exec(function(error, document) {
		if (error) {
			reject({
				error: 'Não foi possível recomendar esse item'
			});
			console.log(error);
		} else {
			resolve(document);
		}
	});
};

exports.addComment = function(promotion_id, comment, resolve, reject) {
	//refatorar usando promises
	var updateQuery = Promotion.update({
		_id: promotion_id
	}, {
		$push: {
			"evaluates.comments": {
				$each: [comment],
				$position: 0
			},
		}
	}, {
		new: true
	});

	updateQuery.exec(function(error, result) {
		if (error) {
			reject({
				error: 'Não foi possível adicionar comentáriom'
			});
			console.log(error);
		} else {
			resolve(result);
		}
	});

};

exports.getOldComments = function(skip, limit, promotion_id, resolve, reject) {
	Promotion.findOne({
		_id: promotion_id
	}, {
		'evaluates.comments': {
			$slice: [parseInt(skip), parseInt(limit)]
		}
	}).populate('evaluates.comments._user', '-password').
	exec(function(exception, result) {
		if (exception) {
			reject({
				error: exception
			});
		} else {
			resolve(result.evaluates.comments);
		}
	});

	/*var queryFind = Promotions.find(
		{
			_id: promotion_id
		},
		{
			'evaluates.comments': {
				$slice: [parseInt(skip), parseInt(limit)]
			}
		}
	);

	queryFind.exec(function(error, result){
		if(error){
			callback({error: 'Não foi possível recuperar o histórico de comentários'});
			console.log(error);
		}else{
			return result[0].evaluates.comments;
		}
	}).exec(function(error, comments){
		var expressions = [];
		for(var i in comments){
			expressions.push({email: comments[i].email});
		}
		var queryFind = db.users.find({
			$or: expressions
		});
	}).exec(function(error, json){


		for(var c in comments){
			for(var u in users){

			}
		}

		for(var i = 0; i < comments.length; i++){
			var search = {email: comments[i].user_id};
			var queryFind = db.users.find(search);
			queryFind.exec(function(error, user){
				comments[i].userInformations = {name:user.name, email: user.email, phone: user.phone};
				commentsResult.push(comments[i]);
			});
		}
	});*/

};

exports.getNewComments = function(promotion_id, commentDate, resolve, reject) {
	var objectId = mongoose.Types.ObjectId(promotion_id);
	var queryFind = Promotion.findOne({
		_id: objectId
	});
	queryFind.populate('evaluates.comments._user', '-password').exec(function(error, result) {
		if (error) {
			reject({
				error: 'Não foi possível recomendar esse item'
			});
			console.log(error);
		} else {
			var comments = result.evaluates.comments;
			var filteredComments = comments.filter(function(comment) {
				return new Date(comment.date) > new Date(commentDate);
			});
			resolve(filteredComments);
		}
	});
};

exports.addPromotion = function(json, resolve, reject) {
	var insertQuery = Promotion.insert(json);
	insertQuery.exec(function(error, response) {
		if (error) {
			reject(error);
		} else {
			timeout.insertNewTimeout(json);
			resolve(response);
		}
	});
};

/*function generateCommentJson(comments, callback){
}*/

function generateResponse(user_id, promotions) {
	var response = [];
	for (var key in promotions) {
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
		if (user_likes.indexOf(user_id) > -1) {
			item.like = true;
		}
		item.likes = user_likes.length;
		item.ended = isEnded(item.endDate);

		response.push(item);
	}
	return response;
}

function isEnded(date) {
	return Date.now() > new Date(date);
}