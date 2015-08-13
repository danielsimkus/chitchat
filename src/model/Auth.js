var Auth = function() {};
Auth.prototype.createToken = function(userName, imageUrl, colour) {
    // ToDo: add some global key store here but for now use this string
    var secureKey = "iskFa0f01Ds";
    var jsonObject = {
        "userName" : userName,
        "imageUrl" : imageUrl,
        "colour"   : colour
    };
    var tmpString = JSON.stringify(jsonObject);
    // ToDo: Allow encryption to be changed
    var encryptionMethod = "aes";
    var crypter = require("crypt-js/" + encryptionMethod);
    if (crypter == null) {
        // ToDo:  Throw error
    }
    var secureHash = crypter(tmpString + secureKey);
    // Return entire string as base64
    jsonObject.push('hash', secureHash);
    return btoa(JSON.stringify(jsonObject));
};

Auth.prototype.validateToken = function(token) {
    var tokenData = this.tokenDecode(token);
    var newToken = this.createToken(jsonObject.userName, jsonObject.imageUrl,jsonObject.colour);
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
