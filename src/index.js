var server = require('modules/Server');
var router = require('modules/Router');
var authController = require('controller/AuthController');
var handlers = {};
handlers['/auth/create'] = authController.createToken;
handlers['/auth/validate'] = authController.createToken;
server.start(router.start, handlers);