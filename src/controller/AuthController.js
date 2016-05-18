
function createToken(response, request) {
    console.log("in AuthController::createToken");
    var params = request.req.query;
    console.log('moo1');
    var Auth = require("../model/Auth");
    console.log('moo2');
    //var auth = new Auth();
    console.log('moo');
    // ToDo: Add a way to easily modify the returned headers for json etc..
    return  Auth.createToken(params.username, params.imageurl, params.colour, params.room);
}

function validateToken(response, request) {
    console.log("in AuthController::validateToken");
    var params = request.req.query;
    var Auth = require("../model/Auth")();
    return Auth.validateToken(params.token);
}
exports.createToken = createToken;
exports.validateToken = validateToken;