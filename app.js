var app = require('./config/app_config.js');
var db = require('./config/db_config.js');
var index = require('./routes/index.js');
var promotionRoutes = require('./routes/promotion.js');
var usersRoutes = require('./routes/user');
var loginRoutes = require('./routes/login');
var establishmentRouter = require('./routes/establishmentRouter.js');
var scriptSendEmail = require('./script/sendEmail.js');

//Rotas sem auth
app.use('/', index);
app.use('/login', loginRoutes);
app.use('/users', usersRoutes);
app.use('/establishment', establishmentRouter);

//Rotas com auth
app.use(require('./auth'));
app.use('/promotions', promotionRoutes);

exports = module.exports = app;
