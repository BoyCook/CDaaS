
var express = require('express');
var app = express(),
    server = require('http').createServer(app),
    CDaaS = require('./CDaaS').CDaaS,
    core = undefined;

app.configure('development', function () {
    console.log('Doing [development] env configure');
});

app.configure('production', function () {
    console.log('Doing [production] env configure');
});

app.configure(function () {
    console.log('Doing [default] configure');
    core = new CDaaS();
    app.use(app.router);
    app.use(express.static(__dirname + '/../public'));
});

app.get('/to/:date', core.toDate);
app.get('/to/:event/at/:date', core.toEventAtDate);
app.get('/from/:timeamount', core.fromAmount);
app.get('/from/:timeamount/for/:event', core.fromAmountForEvent);

exports.startUp = function (config, fn) {
    if (!this.server) {
        this.server = server.listen(config.port, function () {
            console.log('Listening on port [%s]', config.port);
            if (fn) {
                fn();
            }
        });
    }
};

exports.shutDown = function () {
    console.log('Shutting down server');
    this.server.close();
};
