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
    socket.on('addLike', function(req, res){
        var params = {
            _id: validator.trim(validator.escape(req.id)),
            user_id: validator.trim(validator.escape(req.user_id))
        };
        promotionController.addLike(params,
            function(documents){
                var likes = documents.evaluates.user_likes;
                console.log(response);//Object.keys(obj).length
                socket.broadcast.emit('updateLikes', {likes: Object.keys(likes).length});
            }
        );

    });
}

/*Add comment events*/
function onEvaluateCommentsEvent(socket){
    socket.on('addComment', function(req, res){
        var promotionId = validator.trim(validator.escape(req.id));
        var comment = req.comment;
        promotionController.addComment(promotionId, comment,
            function(response){
                console.log(response);
                socket.broadcast.emit('updateComments', {comment: comment});
            }
        );
    });
}

module.exports = io;
