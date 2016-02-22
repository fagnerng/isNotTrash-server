/**
 * Created by Bruno Rafael on 12/09/2015.
 */

var socket_io = require("socket.io");
var io = socket_io();
var promotionController = require('../../controllers/promotionController.js');
var validator = require('validator');

io.on('connection', function(socket){
    socket.on('init', function(json){ // the json contains the token authentication
        onEvaluateLikesEvent(socket);
        onEvaluateCommentsEvent(socket);
    });
});

/*Update the likes in the promotion*/
function onEvaluateLikesEvent(socket){
    socket.on('addRecomend', function(req, res){
        var promotionId = validator.trim(validator.escape(req.id));
        var recomendations = validator.trim(validator.escape(req.recomendations));
        promotionController.updateTotalLikes(promotionId, recomendations).then(
            function(response){
                console.log(response);
                socket.broadcast.emit('updateRecomendations', {recomendations: recomendations});
            }
        );

    });
}

/*Add comment events*/
function onEvaluateCommentsEvent(socket){
    socket.on('addComment', function(req, res){
        var promotionId = validator.trim(validator.escape(req.id));
        var comment = validator.trim(validator.escape(req.comment));
        promotionController.addComment(promotionId, comment).then(
            function(response){
                console.log(response);
                socket.broadcast.emit('updateRecomendations', {comment: comment});
            }
        );
    });
}

module.exports = io;
