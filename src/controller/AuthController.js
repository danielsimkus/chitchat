function createToken(request, response) {
    console.log("in AuthController::createToken");
    response.writeHead(200, {"Content-Type" : "text/plain"});
    response.write("You're awesome");
    response.end();
}

function validateToken(request, response) {
    console.log("in AuthController::validateToken");
    response.writeHead(200, {"Content-Type" : "text/plain"});
    response.write("You're even more awesome than I thought!");
    response.end();
}
exports.createToken = createToken;
exports.validateToken = validateToken;