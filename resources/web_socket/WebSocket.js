/**
 * Created by Bruno Rafael on 12/09/2015.
 */

var socket_io = require("socket.io");
var io = socket_io();
var promotionController = require('../../controllers/promotionController.js');
var validator = require('validator');
var jwt = require('jsonwebtoken');
var config = require('../../config/config.js');

io.on('connection', function(socket){
    console.log('connected');
    jwt.verify(socket.handshake.query.token, config.secret, function(err, decoded) {
        if (err) {
            return socket.disconnect('unauthorized');
        }

        socket.decoded = decoded;
        socket.emit('authenticated');

        onEvaluateLikesEvent(socket);
        onEvaluateCommentsEvent(socket);

        socket.on('disconnect', function(json) {
            console.log('Got disconnect!');
        });

        socket.on('error', function(exception) {
            console.log('SOCKET ERROR ' + exception);
        });
    });
    /*socket.on('authenticate', function (data) {

    });*/

});

/*Update the likes in the promotion*/
function onEvaluateLikesEvent(socket){

    function sendBroadcastUpdateLikes(document){
        if(!document.error) {
            var likes = document.evaluates.user_likes;
            var promotion_id = document._id;
            io.sockets.emit('updateLikes', {promotion_id: promotion_id, likes: likes.length});
        } else {
            io.sockets.emit('error', {error: document.error});
        }
    }

    socket.on('addLike', function(req){
        console.log(socket.client.request.decoded_token);
        var params = {
            promotion_id: validator.trim(validator.escape(req.promotion_id)),
            user_informations: socket.decoded
        };
        promotionController.addLike(params, sendBroadcastUpdateLikes);
    });

    socket.on('removeLike', function(req){
        var params = {
            promotion_id: validator.trim(validator.escape(req.promotion_id)),
            user_informations: socket.decoded
        };
        promotionController.removeLike(params, sendBroadcastUpdateLikes);
        
    });
}

/*Add comment events*/
function onEvaluateCommentsEvent(socket){
    socket.on('addComment', function(req){

    });
}

module.exports = io;
