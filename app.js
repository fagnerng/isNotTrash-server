var app = require('./config/app_config.js'),
	db = require('./config/db_config.js'),
	index = require('./routes/index.js'),
	promotionRoutes = require('./routes/promotion.js'),
	usersRoutes = require('./routes/user'),
	loginRoutes = require('./routes/login'),
	establishmentRouter = require('./routes/establishmentRouter.js'),
	scriptSendEmail = require('./script/sendEmail.js');

/*Rotas sem autenticação*/
app.use('/', index);
app.use('/login', loginRoutes);
app.use('/users', usersRoutes);
app.use('/establishment', establishmentRouter);

/*Rotas com autenticação*/
app.use(require('./auth'));
app.use('/promotions', promotionRoutes);

exports = module.exports = app;