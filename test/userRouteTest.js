var request = require('superagent')
var chai = require('chai');
var expect = chai.expect;

//@FIXME: dar um jeito de mockar o servidor e criar um banco de dados exclusivo para testes
describe('Testes das rotas do servidor referente ao usuário.', function(){
	var id
	var urlBase = 'localhost:1337/users/';
	var newUser = {
			name: 'José',
    		email: 'josé@email.com',
    		password: '123456',
    		phone: '123456789'
		};



	it('POST novo usuário.', function(done){
		request.post(urlBase).send(newUser).end(function(err, res){
			expect(err).to.eql(null);
			expect(res).to.exist;
			expect(res.body._id.length).to.eql(24);
			id = res.body._id;
			done();
		});
	});

	it('GET usuário unico', function(done){
		request.get(urlBase + id).end(function(err, res){
			expect(err).to.eql(null);
			expect(typeof res.body).to.eql('object');
			expect(res.body._id.length).to.eql(24);       
       		expect(res.body._id).to.eql(id);        
        	done();
		});
	});

	it('GET lista de usuários', function(done){
		request.get(urlBase).end(function(err, res){
			expect(err).to.eql(null)
        	expect(res.body.length).to.be.above(0)
        	expect(res.body.map(function (item){return item._id})).to.contain(id)        
        	done()
		});
	});

	it('PUT atualizar um usuário', function(done){
		request.get(urlBase).send({
			name: 'José',
    		email: 'josé@email.com',
    		password: '654321',
    		phone: '123456789',
    		id: '56c3696d4007100300fde277'
		}).end(function(err, res){
			expect(err).to.eql(null)
        	expect(typeof res.body).to.eql('object')    
        	done()
		});
	});

	it('DELETE remover um usuário', function(done){
		request.del(urlBase + id).end(function(e, res){
			expect(e).to.eql(null)
			expect(typeof res.body).to.eql('object') 
       		done()
		})
	});
});