var mongoose = require('mongoose');
var request = require('supertest');
var should = require('should');

var User = require('../models/user.js')

console.log("User: " + User);

describe('Testes das rotas do servidor referente ao usuário:', function(){

	var url = 'http://localhost:1337';

	var newUser = {
        name: 'José',
		email: 'josé@email.com',
		password: '123456',
		phone: '123456789'
    };

	describe('POST:', function(done){

		before(function(done){
			done();
		});


		it('POST Usuário Inexistente', function(done){

			User.model.remove({}, function (err) {
			  if (err) return handleError(err);
			  done();
			});

			request(url)
				.post('/users')
				.send(newUser)
				.end(function(err, res){

					if(err){ throw err; }

					res.body.should.have.property('_id');
					done();
				});
		});
	});
});