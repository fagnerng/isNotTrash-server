var config = {};

config.secret =  "isnottrash"

config.mongoURI = {
	development: 'mongodb://localhost/isnottrash',
	test: 'mongodb://localhost/isnottrash-test'
}

module.exports = config;