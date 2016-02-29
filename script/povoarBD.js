//Conectando ao BD
db = connect("mongodb://localhost/isnottrash");

//Dropa as coleções do BD
db.users.drop();
db.promotions.drop();

//Inserindo usuários
db.users.save({
	name : 'Ygor Santos',
	email : 'ygor.gsan@gmail.com',
	password : '123456789',
	phone: '986668422'
});

db.users.save({
	name : 'Zezinho Transão',
	email : 'zezinho.pegador@email.com',
	password : '123',
	phone: undefined
});

db.users.save({
	name : 'Esquilo Negão',
	email : 'esquilo@email.com',
	password : '321',
	phone: '12345678'
});

db.users.save({
	name : 'Ash Katchum',
	email : 'ilovepikachu@email.com',
	password : 'tenhoquepegar',
	phone: '14523678'
});

db.users.save({
	name : 'Son Goku',
	email : 'goku@email.com',
	password : 'kamehameha!',
	phone: null
});

db.users.save({
	name : 'Jimmy Neutron',
	email : 'neutrons@email.com',
	password : 'souumgenio',
	phone: '9874568711'
});

db.users.save({
	name : 'Bruno Rafael',
	email : 'bruno.rafha@gmail.com',
	password : '123',
	phone: ''
});

db.users.save({
	name : 'Franklin Wesley',
	email : 'franklin@gmail.com',
	password : 'wesley',
});

db.users.save({
	name : 'John Cena',
	email : 'cena@email.com',
	password : 'smackdown',
	phone: '666'
});

db.users.save({
	name : 'Bruce Wayne',
	email : 'bruce@email.com',
	password : 'eusouobatman',
	phone: '123456789'
});

//Inserindo Promoções
db.promotions.save({
   company: {
       name: 'Atacadão',
       subtitle: 'Supermercado atacado e varejo'
   },
   productName: 'Alfaces',
   price: 2.5,
   old_price: 8,
   startDate: 1456066800000,
   endDate: 1456419600000,
   reason: 'Danificação',
   shelf_life: 1456851600000,
   conservation: 'freezer',
   images: [
       'http://hortas.info/sites/default/files/field/image/alface001.jpg'
   ],
   evaluates: {
       likes: 25,
       comments: [
           {
               date: 1456851600000,
               text: 'Não gostei, os alimentos pareciam podres',
               user_id: ""
           }
       ]
   }
});

db.promotions.save({
   company: {
       name: 'Feirinha S2',
       subtitle: 'Tudo natural'
   },
   productName: 'Macaxeira',
   price: 0.5,
   old_price: 4,
   startDate: 1956066800000,
   endDate: 1456419600000,
   reason: 'Ninguem quer',
   shelf_life: 1456851600000,
   conservation: 'caixas',
   images: [
       'http://1.bp.blogspot.com/_QLpEuns8fn4/TJZLFefXC7I/AAAAAAAAGrw/fIp06v3sTZA/s1600/macaxeira_na_brasa.jpg'
   ],
   evaluates: {
       likes: 10,
       comments: [
           {
               date: 1456851600000,
               text: 'Não gostei, ta fedendo',
               user_id: ""
           },{
               date: 1456851800000,
               text: 'Com carne de sol, fica o ouro',
               user_id: ""
           }
       ]
   }
});

db.promotions.save({
   company: {
       name: 'Rede Compras',
       subtitle: 'Supermercado atacado e varejo'
   },
   productName: 'Leite Condensado Moça',
   price: 2.0,
   old_price: 5,
   startDate: 1456066800000,
   endDate: 1456419600000,
   reason: 'Próximo do vencimento',
   shelf_life: 1456851600000,
   conservation: 'caixas',
   images: [
       'http://designices.com/wp-content/uploads/2010/01/leite-moca-retro-1983.jpg'
   ],
   evaluates: {
       likes: 6,
       comments: [
           {
               date: 1456851600000,
               text: 'Não gostei, os alimentos pareciam podres',
               user_id: ""
           }
       ]
   }
});

db.promotions.save({
   company: {
       name: 'Assai',
       subtitle: 'Atacadista'
   },
   productName: 'Doritos',
   price: 5,
   old_price: 15,
   startDate: new Date().getTime(),
   endDate: 1456419600000,
   reason: 'Próximo do vencimento',
   shelf_life: 1456851600000,
   conservation: 'prateleiras',
   images: [
       'http://ig-wp-colunistas.s3.amazonaws.com/blogjovem/wp-content/uploads/2008/10/doritos-011a.jpg'
   ],
   evaluates: {
       likes: 100000,
       comments: [
           {
               date: new Date().getTime(),
               text: '*-*',
               user_id: ""
           }, {
               date: new Date().getTime(),
               text: 'Ô loko!',
               user_id: ""
           }, {
               date: new Date().getTime(),
               text: 'Perfeito',
               user_id: ""
           }, {
               date: new Date().getTime(),
               text: 'Kill me, please!',
               user_id: ""
           }
       ]
   }
});

db.promotions.save({
   company: {
       name: 'Atacadão',
       subtitle: 'Supermercado atacado e varejo'
   },
   productName: 'Iogurte Nestle Grego',
   price: 3,
   old_price: 6,
   startDate: 1456066800000,
   endDate: 1456419600000,
   reason: 'Danificação',
   shelf_life: 1456851600000,
   conservation: 'freezer',
   images: [
       'http://www.esopave.com.br/wp-content/uploads/2012/08/iogurte-grego-nestle03.jpg'
   ],
   evaluates: {
       likes: 0,
       comments: [
           {
               date: 1456851600000,
               text: 'Dé pro gasto',
               user_id: ""
           }
       ]
   }
});

db.promotions.save({
   company: {
       name: 'Atacadão',
       subtitle: 'Supermercado atacado e varejo'
   },
   productName: 'Chocolate Bis',
   price: 0.99,
   old_price: 3.50,
   startDate: 1456066800000,
   endDate: 1456419600000,
   reason: 'Próximo ao vencimento',
   shelf_life: 1456851600000,
   conservation: 'caixas',
   images: [
       'http://www.trash80s.com.br/wp-content/uploads/2010/03/bis2.jpg'
   ],
   evaluates: {
       likes: 0,
       comments: [
           {
               date: 1456851600000,
               text: 'Eu amo bis!',
               user_id: ""
           }
       ]
   }
});
