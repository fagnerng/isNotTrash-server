var request = require('superagent')
var chai = require('chai');
var expect = chai.expect;

//@FIXME: dar um jeito de mockar o servidor e criar um banco de dados exclusivo para testes
describe('Testes das rotas do servidor referente às promoções.', function(){
	var dataAtual = new Date();
	var id = '56c37b6be4b078d2f8e93a14'
	var urlBase = 'localhost:1337/promotions/';
	var newPromotion = {
    	name: 'Chocolate',
    	company: 'Chocolates SA',
    	value: '2,00',
    	duration: '10',
    	start: new Date,
    	end: undefined,
    	reason: 'Porque eu quero',
    	shelf_life: undefined,
    	conservation: 'Bom',
    	isActive: true
  	};

  	it('GET lista de todas promoções', function(done){
		request.get(urlBase + 'all').end(function(err, res){
			expect(err).to.eql(null)
        	expect(res.body.length).to.be.above(0)      
        	done()
		});
	});

	it('GET lista de promoções atuais', function(done){
		request.get(urlBase).end(function(err, res){
			expect(err).to.eql(null)
        	expect(res.body.length).to.be.above(0)
        	res.body.map(function (item){
        		expect(new Date(item.end)).to.be.at.least(dataAtual);
        	})      
        	done()
		});
	});

	it('GET recupera uma promoção unica', function(done){
		request.get(urlBase + id).end(function(err, res){
			expect(err).to.eql(null);
			expect(typeof res.body).to.eql('object');
			expect(res.body._id.length).to.eql(24);       
       		expect(res.body._id).to.eql(id);        
        	done();
		});
	});

	it('GET recupera uma página de promoções', function(done){
		request.get(urlBase + 'pagination/3/10').end(function(err, res){
			expect(err).to.eql(null)
        	expect(res.body.length).to.be.above(0)       
        	done();
		});
	});



});