function start(handlers, pathname, request, response) {
    if (typeof handlers[pathname] == 'function') {
        return handlers[pathname](request, response);
    } else {
        console.log('No handler found for ' + pathname);
        return "404 not found";
    }
}

exports.start = start;