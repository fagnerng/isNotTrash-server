var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var promotionsSchema = new Schema({
	company: {
		name: String,
		subtitle: String
	},
	productName: String,
	price: {
		unit: String,
		actual: Number,
		old: Number
	},
	startDate: Date,
	endDate: Date,
	reason: String,
	shelf_life: Date,
	conservation: String,
	images: [String],
	evaluates: {
		user_likes: [mongoose.Schema.Types.ObjectId],
		comments: [{
			_user: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Users'
			},
			date: Date,
			text: String
		}]
	}
});

module.exports = mongoose.model('Promotions', promotionsSchema);