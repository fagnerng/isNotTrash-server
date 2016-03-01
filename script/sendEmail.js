var express = require('express');
var router = express.Router();

var validator = require('validator');
var nodemailer = require('nodemailer');

var conta = nodemailer.createTransport({
    service: 'Gmail', // Existem outros services, você pode procurar
                      // na documentação do nodemailer como utilizar
                      // os outros serviços
    auth: {
        user: 'ygors.dev@gmail.com', // Seu usuário no Gmail
        pass: '280993.developer' // A senha da sua conta no Gmail :-)
    }
});

// setup e-mail data with unicode symbols
var mailOptions = {
    from: 'Ygor Santos <ygors.dev@gmail.com>', // sender address
    to: 'ygor.rodolfo.santos@ccc.ufcg.edu.br', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world 🐴', // plaintext body
    html: '<b>Hello world 🐴</b>' // html body
};

router.post('/', function(req, res) {
	var email = validator.trim(validator.escape(req.param('email')));
	mailOptions.to = email;
	console.log(mailOptions);
	// send mail with defined transport object
	conta.sendMail(mailOptions, function(error, info){
	    if(error){
	        return res.send(error,500);
	    }
	    console.log('Message sent: ' + info.response);
	});
});

module.exports = router;