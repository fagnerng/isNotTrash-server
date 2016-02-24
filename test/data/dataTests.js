/**
 * Created by Bruno Rafal on 21/02/2016.
 */
var promotions =
    [
        {
            company:{
                name: "Atacadão",
                description: "Supermercado atacado e varejo"
            },
            productName:'Alfaces',
            price: 2.50,
            old_price: 8.00,
            startDate: '2016-02-21T15:00:00',
            endDate: '2016-02-25T17:00:00',
            reason: "Danificação",
            shelf_life: '2016-03-01T17:00:00',
            conservation: 'freezer',
            images: ['http://hortas.info/sites/default/files/field/image/alface001.jpg'],
            evaluates: {
                likes: 25,
                comments: [
                    {
                        date: '2016-03-01T17:00:00',
                        text: "Não gostei, os alimentos pareciam podres",
                        user_id: ''
                    },
                    {
                        date: '2016-03-01T17:00:00',
                        text: "Não gostei, os alimentos pareciam podres",
                        user_id: ''
                    },
                    {
                        date: '2016-03-01T17:00:00',
                        text: "Não gostei, os alimentos pareciam podres",
                        user_id: ''
                    },
                    {
                        date: '2016-03-01T17:00:00',
                        text: "Não gostei, os alimentos pareciam podres",
                        user_id: ''
                    }
                ]
            }
        },
        {
            company:{
                name: 'Maxxi',
                description: "Distribuidor"
            },
            productName: 'Carnes',
            price: 25,
            old_price: 50,
            startDate: '2016-02-19T17:00:00',
            endDate: '2016-02-22T17:00:00',
            reason: 'Validade',
            shelf_life: '2016-02-25T17:00:00',
            conservation: "freezer",
            images: ["http://thumbs.dreamstime.com/z/iogurtes-para-venda-35553105.jpg]"],
            evaluates: {
                likes: 250,
                    comments: []
            }
},
/*{
 company:{
 name: "Doceteria amor e comanhia",
 subtitle: "Doces e "
 },
 value: String,
 old_value: String,
 discount: String,
 start: Date,
 end: Date,
 reason: String,
 shelf_life: Date,
 conservation: String,
 images: [String],
 evaluates: {
 likes: Number,
 comments: []
 }
 },
 {
 company:{
 name: String,
 description: String
 },
 value: String,
 old_value: String,
 discount: String,
 start: Date,
 end: Date,
 reason: String,
 shelf_life: Date,
 conservation: String,
 images: [String],
 evaluates: {
 likes: Number,
 comments: []
 }
 },
 {
 company:{
 name: String,
 description: String
 },
 value: String,
 old_value: String,
 discount: String,
 start: Date,
 end: Date,
 reason: String,
 shelf_life: Date,
 conservation: String,
 images: [String],
 evaluates: {
 likes: Number,
 comments: []
 }
 },
 {
 company:{
 name: String,
 description: String
 },
 value: String,
 old_value: String,
 discount: String,
 start: Date,
 end: Date,
 reason: String,
 shelf_life: Date,
 conservation: String,
 images: [String],
 evaluates: {
 likes: Number,
 comments: []
 }
 },
 {
 company:{
 name: String,
 description: String
 },
 value: String,
 old_value: String,
 discount: String,
 start: Date,
 end: Date,
 reason: String,
 shelf_life: Date,
 conservation: String,
 images: [String],
 evaluates: {
 likes: Number,
 comments: []
 }
 },
 {
 company:{
 name: String,
 description: String
 },
 value: String,
 old_value: String,
 discount: String,
 start: Date,
 end: Date,
 reason: String,
 shelf_life: Date,
 conservation: String,
 images: [String],
 evaluates: {
 likes: Number,
 comments: []
 }
 },
 {
 company:{
 name: String,
 description: String
 },
 value: String,
 old_value: String,
 discount: String,
 start: Date,
 end: Date,
 reason: String,
 shelf_life: Date,
 conservation: String,
 images: [String],
 evaluates: {
 likes: Number,
 comments: []
 }
 }*/
];




/*
* var promotions =
 [
 {company:{ name: 'Atacadão', subtitle: 'Supermercado atacado e varejo' }, productName:'Alfaces', price: 2.50, old_price: 8.00, startDate: 1456066800000, endDate: 1456419600000, reason: 'Danificação', shelf_life:1456851600000, conservation: 'freezer', images: ['http://hortas.info/sites/default/files/field/image/alface001.jpg'], evaluates: { likes: 25, comments: [ { date: 1456851600000, text: 'Não gostei, os alimentos pareciam podres', user_id: '' }, { date: 1456851600000, text: 'Não gostei, os alimentos pareciam podres', user_id: '' }, { date: 1456851600000, text: 'Não gostei, os alimentos pareciam podres', user_id: '' }, { date: 1456851600000, text: 'Não gostei, os alimentos pareciam podres', user_id: '' } ] } },
 {
 company:{
 name: 'Maxxi',
 description: "Distribuidor"
 },
 productName: 'Carnes',
 price: 25,
 old_price: 50,
 startDate: 1455901200000,
 endDate: 1456160400000,
 reason: 'Validade',
 shelf_life: 1456419600000,
 conservation: "freezer",
 images: [http://thumbs.dreamstime.com/z/iogurtes-para-venda-35553105.jpg],
 evaluates: {
 likes: 250,
 comments: []
 }
 },
 /*{
 company:{name: "Amor e comanhia",subtitle: "Doceteria e lanchonete"},productName:"M&Ms de castanha e amendoin",price: 10,old_price: 15,startDate: 1456079417348,endDate: 1456252186270,reason: "validade",shelf_life: 1456684186270,conservation: "freezer",images: ["http://thumbs.dreamstime.com/z/chocolates-coloridos-do-c%C3%ADrculo-40198766.jpg"],evaluates: {likes: 28,comments: []}},
 {company:{name: "Tiago calçados",subtitle: "A últims tendência da moda"},productName:"Tenis rainha",price: 82,old_price: 120,startDate: 1456266306049,endDate: 1456439106049,reason: "Danificação",shelf_life: 1456698306049,conservation: "normal",images: ["http://www.deckeronline.com.br/FILES/produtos/imagens/a10b427575427761b45c7cf5710a0e3e.jpg"],evaluates: {likes: 32,comments: []}},
 {
 company:{
 name: String,
 subtitle: String
 },
 price: String,
 old_price: String,
 "": String,
 startDate: Date,
 endDate: Date,
 reason: String,
 shelf_life: Date,
 conservation: String,
 images: [String],
 evaluates: {
 likes: Number,
 comments: []
 }
 },
 {
 company:{
 name: String,
 subtitle: String
 },
 price: String,
 old_price: String,
 "": String,
 startDate: Date,
 endDate: Date,
 reason: String,
 shelf_life: Date,
 conservation: String,
 images: [String],
 evaluates: {
 likes: Number,
 comments: []
 }
 },
 {
 company:{
 name: String,
 subtitle: String
 },
 price: String,
 old_price: String,
 "": String,
 startDate: Date,
 endDate: Date,
 reason: String,
 shelf_life: Date,
 conservation: String,
 images: [String],
 evaluates: {
 likes: Number,
 comments: []
 }
 },
 {
 company:{
 name: String,
 subtitle: String
 },
 price: String,
 old_price: String,
 "": String,
 startDate: Date,
 endDate: Date,
 reason: String,
 shelf_life: Date,
 conservation: String,
 images: [String],
 evaluates: {
 likes: Number,
 comments: []
 }
 },
 {
 company:{
 name: String,
 subtitle: String
 },
 price: String,
 old_price: String,
 "": String,
 startDate: Date,
 endDate: Date,
 reason: String,
 shelf_life: Date,
 conservation: String,
 images: [String],
 evaluates: {
 likes: Number,
 comments: []
 }
 }*/
];
* */