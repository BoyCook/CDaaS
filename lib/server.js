
var express = require('express');
var app = express(),
    server = require('http').createServer(app),
    Service = require('./service').Service,
    service = undefined;

app.configure('development', function () {
    console.log('Doing [development] env configure');
});

app.configure(function () {
    console.log('Doing [default] configure');
    service = new Service();
    app.use(app.router);
    app.use(express.static(__dirname + '/../public'));
});

app.get('/:timeamount', service.fromAmount);
app.get('/to/:date', service.toDate);
app.get('/to/:event/on/:date', service.toEventAtDate);
app.get('/to/:event/at/:date', service.toEventAtDate);
app.get('/from/:timeamount', service.fromAmount);
app.get('/from/:timeamount/for/:event', service.fromAmountForEvent);

exports.startUp = function (config, fn) {
    this.server = server.listen(config.port, function () {
        console.log('Listening on port [%s]', config.port);
        if (fn) {
            fn();
        }
    });
};

exports.shutDown = function (fn) {
    console.log('Shutting down server');
    this.server.close(fn);
};
