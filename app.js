var app = require('./config/app_config.js');
var index = require('./routes/index.js');
var promotionRoutes = require('./routes/promotion.js');
var usersRoutes = require('./routes/user');
var loginRoutes = require('./routes/login');

//Rotas sem auth
app.use('/', index);
app.use('/login', loginRoutes);
app.use('/users', usersRoutes);

//Rotas com auth
app.use(require('./auth'));
app.use('/promotions', promotionRoutes);	