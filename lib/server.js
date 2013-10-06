
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

app.get('/', service.redirectToFrom);
app.get('/api', service.loadHTML);
app.get('/helper', service.loadHTML);
app.get('/to', service.loadHTML);
app.get('/up', service.loadHTML);
app.get('/from', service.loadHTML);
app.get('/:timeamount', service.fromAmount);
app.get('/from/:timeamount', service.fromAmount);
app.get('/from/:timeamount/for/:event', service.fromAmountForEvent);
app.get('/to/:date', service.toDate);
app.get('/to/:date/for/:event', service.toDateForEvent);
app.get('/up/:timeamount', service.upAmount);
app.get('/up/:timeamount/for/:event', service.upAmountForEvent);


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
