var assert = require('assert');
var chai = require('chai');
var expect = chai.expect;

var db = require('./config/db_config_test');
var userController = require('../controllers/userController.js');

//TODO: terminar
/*
beforeEach(function(){
	db.promotions.insert({
		name: 'José',
    	email: 'josé@email.com',
    	password: '123456',
    	phone: '123456789',
    	id:
	});
});

after(function(){

});

describe('userController', function(){
	describe('listar usuários', function(){
		it('teste ok', function(){
			userController.list(function(response){
				var item = json(response);
				expect(item.name).to.be.equals('José');
			});
		});
	});
});
*/