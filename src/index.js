var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var authController = require('./controller/AuthController');
app.get('/auth/create', function(res, req) {
    var token = authController.createToken(res, req);
    res.send(token);
});

app.get('/auth/validate', function(res, req){
    var validation = authController.validateToken(res, req);
    res.send(validation);
});


io.on('connection', function(socket){
    console.log('Connected');
    socket.on('disconnect', function(){
        console.log('disconnected');
    })
});

http.listen(8181, function(){
    console.log('listening on *:8181');
});
