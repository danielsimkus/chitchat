function start(handlers, pathname, request, response) {
    console.log(handlers);
    console.log(pathname);
    console.log(typeof handlers[pathname]);
    if (typeof handlers[pathname] == 'function') {
        return handlers[pathname](request, response);
    } else {
        console.log('No handler found for ' + pathname);
        return "404 not found";
    }
}

exports.start = start;