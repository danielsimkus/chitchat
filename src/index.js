var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


var authController = require('./controller/AuthController');
app.get('/auth/create', function(req, res) {
    var token = authController.createToken(req, res);
    console.log("returning: " + token);
    res.send(JSON.stringify(token));
});

app.get('/auth/validate', function(req, res){
    var validation = authController.validateToken(req, res);
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
