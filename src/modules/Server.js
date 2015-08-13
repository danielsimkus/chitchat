var http = require('http');
var url = require('url');
function start(route, handlers) {
    function onRequest(request, response) {
        var pathname = url.parse(request.url).pathname;
        console.log('Received request from ' + request.connection.remoteAddress);
        console.log('Pathname: ' + pathname);

        var content = "Something!";

        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.write(content);
        response.end();
    }
    http.createServer(onRequest).listen(process.env.PORT);
    console.log('Server running on port ' + String(process.env.PORT));
}

exports.start = start;