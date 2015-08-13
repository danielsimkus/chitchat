var http = require('http');
var url = require('url');
function start(route, handlers) {
    function onRequest(request, response) {
        var pathname = url.parse(request.url).pathname;
        console.log('Received request from ' + request.connection.remoteAddress);
        console.log('Pathname: ' + pathname);

        var content = route(handlers, pathname, request, response);

        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.write(content);
        response.end();
    }
    http.createServer(onRequest).listen(8181);
    console.log('Server running on port ' + String(8181));
}

exports.start = start;