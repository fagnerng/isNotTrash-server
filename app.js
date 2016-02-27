var app = require('./config/app_config.js');
var index = require('./routes/index.js');
var promotionRoutes = require('./routes/promotion.js');
var usersRoutes = require('./routes/user');
var loginRoutes = require('./routes/login');


app.use('/', index);

app.use('/promotions', promotionRoutes);

app.use('/users', usersRoutes);

app.use('/login', loginRoutes);