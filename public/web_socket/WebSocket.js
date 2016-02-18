/**
 * Created by bruno.rafael on 2/18/2016.
 */
var socket_io = require('socket.io');
var io = socket_io();

io.on('connection', function(socket){
    console.log('Cliente conectado!');
});

module.exports = io;