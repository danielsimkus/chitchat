console.log('moo9');
var encryptionMethod = "aes";
var crypter = require("crypto-js/" + encryptionMethod);
var secureKey = "iskFa0f01Ds";
// ToDo: Save this in a config somewhere

var Auth = function() {}

Auth.prototype.createToken = function(userName, imageUrl, colour, room) {
    // ToDo: add some global key store here but for now use this string
    var jsonObject = {
        "username" : username,
        "imageurl" : imageurl,
        "colour"   : colour,
        "room"     : room
    };
    var tmpString = JSON.stringify(jsonObject);
    console.log(tmpString);
    var secureHash = crypter(tmpString + secureKey);
    console.log(secureHash);
    // Return entire string as base64
    jsonObject.push('token', secureHash);
    console.log('pushing to obj');
    return btoa(JSON.stringify(jsonObject));
};

Auth.prototype.validateToken = function(token) {
    var tokenData = this.tokenDecode(token);
    var newToken = this.createToken(tokenData.username, tokenData.imageurl,tokenData.colour,tokenData.room);
    if (newToken != token) {
        return null;
    } else {
        delete tokenData.hash;
        return tokenData;
    }
};

// Turn the token string, into a json Object
Auth.prototype.tokenDecode = function(token) {
    var string = atob(token);
    return JSON.parse(string);
};

module.exports = Auth;