var mongoose = require('mongoose');
var request = require('supertest');
var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var expect = chai.expect

//Usar request do chai
chai.use(chaiHttp);

var User = require('../models/user.js')

var dbURI = 'mongodb://localhost/isnottrash';

var clearDB = clearDB = require('mocha-mongoose')(dbURI, {
	noClear: true
});

describe('Testes das rotas do servidor referente ao usuário:', function() {

	var url = 'http://localhost:1337';

	//Inicia conexao com o Banco de Dados usando mocha-mongoose
	before(function(done) {
		if (mongoose.connection.db) return done();
		mongoose.connect(dbURI, done);
	});

	describe('GET: ', function() {

		//Cria um usuário antes de cada teste
		beforeEach(function(done) {

			var users = [{
					name: 'Ygor Santos',
					email: 'ygor.gsan@gmail.com',
					password: '123456789',
					phone: '986668422'
				},

				{
					name: 'Zezinho Transão',
					email: 'zezinho.pegador@email.com',
					password: '123',
					phone: '999415698'
				},

				{
					name: 'Esquilo Negão',
					email: 'esquilo@email.com',
					password: '321',
					phone: '12345678'
				}
			]

			User.create(users, function(err, users) {
				done();
			})
		});

		//Apaga o banco depois de cada teste
		afterEach(function(done) {
			clearDB(done);
		});

		it('Recupera usuário por qualquer parametro (query)', function(done) {
			chai.request(url)
				.get('/users')
				.query({
					"email": "ygor.gsan@gmail.com"
				})
				.end(function(err, res) {
					expect(err).to.not.exist;
					res.should.have.status(200);
					res.should.be.json;
					res.body.should.be.a('array');
					res.body.should.to.have.length(1);
					res.body[0].should.have.property('_id');
					res.body[0].should.have.property('name');
					res.body[0].should.have.property('password');
					res.body[0].should.have.property('email');
					res.body[0].should.have.property('phone');
					done();
				});
		});

		it('Recupera todos os usuário', function(done) {
			chai.request(url)
				.get('/users')
				.end(function(err, res) {
					expect(err).to.not.exist;
					res.should.have.status(200);
					res.should.be.json;
					res.body.should.be.a('array');
					res.body.should.to.have.length(3);
					res.body[0].should.have.property('_id');
					res.body[0].should.have.property('name');
					res.body[0].should.have.property('password');
					res.body[0].should.have.property('email');
					res.body[0].should.have.property('phone');
					done();
				});
		});
	});

	//Teste das rotas POST de users
	describe('POST: ', function() {

		//Cria um usuário antes de cada teste
		beforeEach(function(done) {
			new User({
				name: 'José',
				email: 'jose@email.com',
				password: '123456',
				phone: '123456789'
			}).save(function(err, user) {
				done();
			});
		});

		//Apaga o banco depois de cada teste
		afterEach(function(done) {
			clearDB(done);
		});

		//Teste para salvar um novo usuário no Banco de Dados
		it('Salvar novo usuário', function(done) {

			User.find({}, function(err, users) {

				expect(err).to.not.exist;
				//Verifica se há apenas um usuário cadastrado no Banco (beforeEach)
				users.should.to.have.length(1);

				chai.request(url)
					.post('/users')
					.send({
						name: 'Diego',
						email: 'diego@email.com',
						password: '1234',
						phone: '+5583999415698'
					})
					.end(function(err, res) {
						expect(err).to.not.exist;
						res.should.have.status(200);
						res.should.be.json;
						res.body.should.be.a('object');
						res.body.should.have.property('msg');
						res.body.should.have.property('user');
						res.body.msg.should.have.equal("Usuário salvo com sucesso");
						res.body.user.should.have.property('_id');
						res.body.user.should.have.property('email');
						res.body.user.should.have.property('password');
						res.body.user.name.should.equal('Diego');
						res.body.user.email.should.equal('diego@email.com');
						res.body.user.phone.should.equal('+5583999415698');

						User.find({}, function(err, users) {
							expect(err).to.not.exist;
							users.should.to.have.length(2);
							done();
						});
					});
			});
		});

		it('Não deve salvar usuário com mesmo e-mail', function(done) {

			chai.request(url)
				.post('/users')
				.send({
					name: 'José',
					email: 'jose@email.com',
					password: '123456',
					phone: '123456789'
				})
				.end(function(err, res) {
					expect(err).to.exist;
					res.should.have.status(400);
					res.should.be.json;
					res.body.should.be.a('object');
					res.body.should.have.property('error');
					res.body.error.should.have.equal("E-mail já cadastrado. Por favor insira outro e-mail");
					done();
				});
		});
	});

	describe('PUT: ', function() {

		beforeEach(function(done) {
			new User({
				name: 'José',
				email: 'jose@email.com',
				password: '123456',
				phone: '123456789'
			}).save(function(err, user) {
				done();
			});
		});

		//Apaga o banco depois de cada teste
		afterEach(function(done) {
			clearDB(done);
		});

		it("Edita atributos de um usuario", function(done) {
			chai.request(url)
				.put('/users')
				.send({
					name: 'Silva',
					email: 'jose@email.com',
					password: '123456',
					phone: '987654321'
				})
				.end(function(err, res) {
					expect(err).to.not.exist;
					res.should.have.status(200);
					res.should.be.json;
					res.body.should.be.a('object');
					res.body.should.have.property('msg');
					res.body.msg.should.equal("Usuário atualziado com sucesso");
					res.body.should.have.property('user');
					res.body.user.should.have.property('_id');
					res.body.user.should.have.property('name');
					res.body.user.should.have.property('email');
					res.body.user.should.have.property('password');
					res.body.user.name.should.equal('Silva');
					res.body.user.email.should.equal('jose@email.com');
					res.body.user.phone.should.equal('987654321');
					done();
				});
		});
	});
});