/**
 * Created by Bruno Rafael on 12/09/2015.
 */

var socket_io = require("socket.io");
var io = socket_io();
var promotionController = require('../../controllers/promotionController.js');
var validator = require('validator');
var jwt = require('jsonwebtoken');
var config = require('../../config/config.js');

const CONNECTION = 'connection',
      UNAUTHORIZED = 'unauthorized',
      AUTHENTICATED = 'authenticated',
      DISCONNECT= 'disconnect',
      ERROR = 'error',
      UPDATE_LIKES= 'updateLikes',
      ADD_LIKE = 'addLike',
      REMOVE_LIKE = 'removeLike',
      ADD_COMMENT = 'addComment',
      UPDATE_COMMENTS = 'updateComments/';

io.on(CONNECTION, function(socket){
    console.log('connected');
    jwt.verify(socket.handshake.query.token, config.secret, function(err, userInformations) {
        if (err) {
            return socket.disconnect(UNAUTHORIZED);
        }

        socket.userInformations = userInformations;
        socket.emit(AUTHENTICATED);

        onEvaluateLikesEvent(socket);
        onEvaluateCommentsEvent(socket);

        socket.on(DISCONNECT, function(json) {
            console.log('Got disconnect!');
        });

        socket.on(ERROR, function(exception) {
            console.log('SOCKET ERROR ' + exception);
        });
    });
});

/*Update the likes in the promotion*/
function onEvaluateLikesEvent(socket){

    function sendBroadcastUpdateLikes(document){
        if(!document.error) {
            var likes = document.evaluates.user_likes;
            var promotion_id = document._id;
            socket.broadcast.emit(UPDATE_LIKES, {promotion_id: promotion_id, likes: likes.length});
        } else {
            socket.broadcast.emit(ERROR, {error: document.error});
        }
    }

    socket.on(ADD_LIKE, function(req){
        var params = {
            promotion_id: validator.trim(validator.escape(req.promotion_id)),
            user_informations: socket.userInformations
        };
        promotionController.addLike(params, sendBroadcastUpdateLikes, function(exception){});
    });

    socket.on(REMOVE_LIKE, function(req){
        var params = {
            promotion_id: validator.trim(validator.escape(req.promotion_id)),
            user_informations: socket.userInformations
        };
        promotionController.removeLike(params, sendBroadcastUpdateLikes, function(exception){});
        
    });
}

function onEvaluateCommentsEvent(socket){
    socket.on(ADD_COMMENT, function(req){
        var promotion_id = validator.trim(validator.escape(req.promotion_id));
        var comment = req.comment;
        var saveComment = {
            date: comment.date,
            text: comment.text,
            _user: comment._user._id
        };
        promotionController.addComment(promotion_id, saveComment,
            function(){
                var listenerId = UPDATE_COMMENTS + promotion_id;
                socket.broadcast.emit(listenerId, {comment: comment});
            },
            function(exception){
                socket.broadcast.emit(ERROR, {error: exception});
            }
        );
    });
}

module.exports = io;
