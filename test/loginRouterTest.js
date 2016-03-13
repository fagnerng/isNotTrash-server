var mongoose = require('mongoose');
var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var expect = chai.expect;
var assert = require('chai').assert
var jwt = require('jsonwebtoken');
var config = require('../config/config.js');

//Usar request do chai
chai.use(chaiHttp);

var User = require('../models/user.js')

var dbURI = 'mongodb://localhost/isnottrash';

var clearDB = clearDB = require('mocha-mongoose')(dbURI, {
	noClear: true
});

describe("Tetes da rota de Login", function() {

	var url = 'http://localhost:1337';

	before(function(done) {
		if (mongoose.connection.db) return done();
		mongoose.connect(dbURI, done);
	});

	before(function(done) {
		var users = [{
				name: 'Ygor Santos',
				email: 'ygor.gsan@gmail.com',
				password: '123456789',
				phone: '986668422'
			}
		];

		User.create(users, function(err, users) {
			done();
		});
	});

	after(function(done) {
		clearDB(done);
	});

	it("Login con usuario valido", function(done) {
		chai.request(url)
			.post("/login")
			.send({
				"email": "ygor.gsan@gmail.com",
				"password": "123456789"
			})
			.end(function(err, res) {
				expect(err).to.not.exist;
				res.should.be.json;
				res.body.should.have.property('success');
				res.body.should.have.property('msg');
				res.body.should.have.property('token');
				res.body.should.have.property('userInformations');
				res.body.userInformations.name.should.equal('Ygor Santos');
				res.body.userInformations.phone.should.equal('986668422');
				res.body.userInformations.email.should.equal('ygor.gsan@gmail.com');

				var token_res = res.body.token;

				var userInformations = {
					name: 'Ygor Santos',
					email: 'ygor.gsan@gmail.com',
					phone: '986668422'
				};

				var token = jwt.sign(userInformations, config.secret);

				expect(token).to.equal(token_res);
				done();
			});

	});

	it("Login com usuario invalido", function(done) {
		done();
	});

});