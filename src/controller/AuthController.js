require('url');

function createToken(request, response) {
    console.log("in AuthController::createToken");
    //ToDo: Make it support not using imageUrl and colour (get a random colour)
    params = url.parse(request.url, true);
    require("../model/Auth");
    var Auth = new Auth();
    // ToDo: Add a way to easily modify the returned headers for json etc..
    return  Auth.createToken(params.userName, params.imageUrl, params.colour);
}

function validateToken(request, response) {
    console.log("in AuthController::validateToken");
    return "You're even more awesome than I thought!";
}
exports.createToken = createToken;
exports.validateToken = validateToken;