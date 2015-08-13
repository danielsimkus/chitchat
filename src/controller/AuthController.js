function createToken(request, response) {
    console.log("in AuthController::createToken");
    return "You're awesome";
}

function validateToken(request, response) {
    console.log("in AuthController::validateToken");
    return "You're even more awesome than I thought!";
}
exports.createToken = createToken;
exports.validateToken = validateToken;