var express = require('express');
var router = express.Router();

/*Rota padrão '/' verifica se o servidor está online*/
router.get('/', (req, res) => {
  res.end('Servidor On!');
});

module.exports = router;
