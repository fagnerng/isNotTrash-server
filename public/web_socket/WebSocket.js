/**
 * Created by Bruno Rafael on 12/09/2015.
 */

var socket_io = require("socket.io");
var io = socket_io();
var promotionController = require('../../controllers/promotionController.js');
var validator = require('validator');

io.on('connection', function(socket){
    socket.on('init', function(){ // the json contains the token authentication
        onEvaluateLikesEvent(socket);
        onEvaluateCommentsEvent(socket);
    });
});

/*Update the likes in the promotion*/
function onEvaluateLikesEvent(socket){

    function sendBroadcastUpdateLikes(document){
        if(!document.error) {
            var likes = document.evaluates.user_likes;
            var promotion_id = document._id;
            io.sockets.emit('updateLikes', {promotion_id: promotion_id, likes: likes.length});
        } else {
            io.sockets.emit('error', {error: error});
        }
    }

    socket.on('addLike', function(req){
        var params = {
            promotion_id: validator.trim(validator.escape(req.promotion_id)),
            user_id: validator.trim(validator.escape(req.user_id))
        };
        promotionController.addLike(params, sendBroadcastUpdateLikes);
    });

    socket.on('removeLike', function(req){
        var params = {
            promotion_id: validator.trim(validator.escape(req.promotion_id)),
            user_id: validator.trim(validator.escape(req.user_id))
        };

        promotionController.removeLike(params, sendBroadcastUpdateLikes);

    });
}

/*Add comment events*/
function onEvaluateCommentsEvent(socket){
    socket.on('addComment', function(req){
        var promotion_id = validator.trim(validator.escape(req.promotion_id));
        var comment = req.comment;
        promotionController.addComment(promotion_id, comment, function(response){
            socket.broadcast.emit('updateComments', {comment: comment});
        });
    });
}

module.exports = io;
