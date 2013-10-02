var should = require('should');
var request = require('request');
var url = 'http://localhost:8088';
var Server = require('../lib/server');
describe('CountDown', function () {
    before(function (done) {
        Server.startUp({ port: 8088 }, done);
    });

    after(function (done) {
        Server.shutDown(done);
    });

    describe('#/', function () {
        it('time amount should work', function (done) {
            request({url: url + '/10', headers: { Accept: 'application/json'}},
                function (error, response, body) {
                    response.statusCode.should.eql(200);
                    var data = JSON.parse(body);
                    fixData(data);
                    data.should.eql({
                        date: "",
                        event: "",
                        unit: "s",
                        tick: "true",
                        msg: "Time is up:",
                        css: "",
                        overflow: false,
                        warning: []
                    });
                    done();
                });
        });        
        it('should return HTML homepage', function (done) {
            request({url: url, headers: { Accept: 'text/html'}},
                function (error, response, body) {
                    response.statusCode.should.eql(200);
                    done();
                });
        });                
    });

    describe('#api', function () {
        it('should return HTML page', function (done) {
            request({url: url + '/api', headers: { Accept: 'text/html'}},
                function (error, response, body) {
                    response.statusCode.should.eql(200);
                    done();
                });
        });                        
    });

    describe('#from', function () {
        it('should return HTML search page', function (done) {
            request({url: url + '/from', headers: { Accept: 'text/html'}},
                function (error, response, body) {
                    response.statusCode.should.eql(200);
                    done();
                });
        });                
        it('time amount should work', function (done) {
            request({url: url + '/from/10000', headers: { Accept: 'application/json'}},
                function (error, response, body) {
                    response.statusCode.should.eql(200);
                    var data = JSON.parse(body);
                    fixData(data);
                    data.should.eql({
                        date: "",
                        event: "",
                        unit: "s",
                        tick: "true",
                        msg: "Time is up:",
                        css: "",
                        overflow: false,
                        warning: []
                    });
                    done();
                });
        });        
        it('time amount for event should work', function (done) {
            request({url: url + '/from/10000/for/Egg is cooked', headers: { Accept: 'application/json'}},
                function (error, response, body) {
                    response.statusCode.should.eql(200);
                    var data = JSON.parse(body);
                    fixData(data);
                    data.should.eql({
                        date: "",
                        event: "Egg is cooked",
                        unit: "s",
                        tick: "true",
                        msg: "Time is up:",
                        css: "",
                        overflow: false,
                        warning: []
                    });
                    done();
                });
        });
        it('should work with params', function (done) {
            request({url: url + '/from/10000?msg=End&warning=5:yellow,1:red', headers: { Accept: 'application/json'}},
                function (error, response, body) {
                    response.statusCode.should.eql(200);
                    var data = JSON.parse(body);
                    fixData(data);
                    data.should.eql({
                        date: "",
                        event: "",
                        unit: "s",
                        tick: "true",
                        msg: "End",
                        css: "",
                        overflow: false,
                        warning: [{
                            "ms": 5000,
                            "colour": "yellow"
                        }, {
                            "ms": 1000,
                            "colour": "red"
                        }]
                    });
                    done();
                });
        });
        it('should work for year unit', function (done) {
            request({url: url + '/from/1?unit=y', headers: { Accept: 'application/json'}},
                function (error, response, body) {
                    response.statusCode.should.eql(200);
                    var data = JSON.parse(body);
                    fixData(data);
                    data.should.eql({
                        date: "",
                        event: "",
                        unit: "y",
                        tick: "true",
                        msg: "Time is up:",
                        css: "",
                        overflow: false,
                        warning: []
                    });
                    done();
                });
        });                
        it('should work for day unit', function (done) {
            request({url: url + '/from/1?unit=d', headers: { Accept: 'application/json'}},
                function (error, response, body) {
                    response.statusCode.should.eql(200);
                    var data = JSON.parse(body);
                    fixData(data);
                    data.should.eql({
                        date: "",
                        event: "",
                        unit: "d",
                        tick: "true",
                        msg: "Time is up:",
                        css: "",
                        overflow: false,
                        warning: []
                    });
                    done();
                });
        });                
        it('should work for hour unit', function (done) {
            request({url: url + '/from/1?unit=h', headers: { Accept: 'application/json'}},
                function (error, response, body) {
                    response.statusCode.should.eql(200);
                    var data = JSON.parse(body);
                    fixData(data);
                    data.should.eql({
                        date: "",
                        event: "",
                        unit: "h",
                        tick: "true",
                        msg: "Time is up:",
                        css: "",
                        overflow: false,
                        warning: []
                    });
                    done();
                });
        });                
        it('should work for minute unit', function (done) {
            request({url: url + '/from/1?unit=m', headers: { Accept: 'application/json'}},
                function (error, response, body) {
                    response.statusCode.should.eql(200);
                    var data = JSON.parse(body);
                    fixData(data);
                    data.should.eql({
                        date: "",
                        event: "",
                        unit: "m",
                        tick: "true",
                        msg: "Time is up:",
                        css: "",
                        overflow: false,
                        warning: []
                    });
                    done();
                });
        });                
        it('should work for second unit', function (done) {
            request({url: url + '/from/1?unit=s', headers: { Accept: 'application/json'}},
                function (error, response, body) {
                    response.statusCode.should.eql(200);
                    var data = JSON.parse(body);
                    fixData(data);
                    data.should.eql({
                        date: "",
                        event: "",
                        unit: "s",
                        tick: "true",
                        msg: "Time is up:",
                        css: "",
                        overflow: false,
                        warning: []
                    });
                    done();
                });
        });                                        
    }); 

    describe('#up', function () {
        it('should return HTML search page', function (done) {
            request({url: url + '/up', headers: { Accept: 'text/html'}},
                function (error, response, body) {
                    response.statusCode.should.eql(200);
                    done();
                });
        });                
        it('time amount should work', function (done) {
            request({url: url + '/up/10000', headers: { Accept: 'application/json'}},
                function (error, response, body) {
                    response.statusCode.should.eql(200);
                    var data = JSON.parse(body);
                    fixData(data);
                    data.should.eql({
                        date: "",
                        event: "",
                        unit: "s",
                        tick: "true",
                        msg: "Time is up:",
                        css: "",
                        overflow: false,
                        warning: []
                    });
                    done();
                });
        });        
        it('time amount for event should work', function (done) {
            request({url: url + '/up/10000/for/Egg is cooked', headers: { Accept: 'application/json'}},
                function (error, response, body) {
                    response.statusCode.should.eql(200);
                    var data = JSON.parse(body);
                    fixData(data);
                    data.should.eql({
                        date: "",
                        event: "Egg is cooked",
                        unit: "s",
                        tick: "true",
                        msg: "Time is up:",
                        css: "",
                        overflow: false,
                        warning: []
                    });
                    done();
                });
        });
        it('should work with params', function (done) {
            request({url: url + '/up/10000?msg=End&warning=5:yellow,1:red', headers: { Accept: 'application/json'}},
                function (error, response, body) {
                    response.statusCode.should.eql(200);
                    var data = JSON.parse(body);
                    fixData(data);
                    data.should.eql({
                        date: "",
                        event: "",
                        unit: "s",
                        tick: "true",
                        msg: "End",
                        css: "",
                        overflow: false,
                        warning: [{
                            "ms": 5000,
                            "colour": "yellow"
                        }, {
                            "ms": 1000,
                            "colour": "red"
                        }]
                    });
                    done();
                });
        });
        it('should work for year unit', function (done) {
            request({url: url + '/up/1?unit=y', headers: { Accept: 'application/json'}},
                function (error, response, body) {
                    response.statusCode.should.eql(200);
                    var data = JSON.parse(body);
                    fixData(data);
                    data.should.eql({
                        date: "",
                        event: "",
                        unit: "y",
                        tick: "true",
                        msg: "Time is up:",
                        css: "",
                        overflow: false,
                        warning: []
                    });
                    done();
                });
        });                
        it('should work for day unit', function (done) {
            request({url: url + '/up/1?unit=d', headers: { Accept: 'application/json'}},
                function (error, response, body) {
                    response.statusCode.should.eql(200);
                    var data = JSON.parse(body);
                    fixData(data);
                    data.should.eql({
                        date: "",
                        event: "",
                        unit: "d",
                        tick: "true",
                        msg: "Time is up:",
                        css: "",
                        overflow: false,
                        warning: []
                    });
                    done();
                });
        });                
        it('should work for hour unit', function (done) {
            request({url: url + '/up/1?unit=h', headers: { Accept: 'application/json'}},
                function (error, response, body) {
                    response.statusCode.should.eql(200);
                    var data = JSON.parse(body);
                    fixData(data);
                    data.should.eql({
                        date: "",
                        event: "",
                        unit: "h",
                        tick: "true",
                        msg: "Time is up:",
                        css: "",
                        overflow: false,
                        warning: []
                    });
                    done();
                });
        });                
        it('should work for minute unit', function (done) {
            request({url: url + '/up/1?unit=m', headers: { Accept: 'application/json'}},
                function (error, response, body) {
                    response.statusCode.should.eql(200);
                    var data = JSON.parse(body);
                    fixData(data);
                    data.should.eql({
                        date: "",
                        event: "",
                        unit: "m",
                        tick: "true",
                        msg: "Time is up:",
                        css: "",
                        overflow: false,
                        warning: []
                    });
                    done();
                });
        });                
        it('should work for second unit', function (done) {
            request({url: url + '/up/1?unit=s', headers: { Accept: 'application/json'}},
                function (error, response, body) {
                    response.statusCode.should.eql(200);
                    var data = JSON.parse(body);
                    fixData(data);
                    data.should.eql({
                        date: "",
                        event: "",
                        unit: "s",
                        tick: "true",
                        msg: "Time is up:",
                        css: "",
                        overflow: false,
                        warning: []
                    });
                    done();
                });
        });                                        
    }); 

    describe('#to', function () {
        it('should return HTML search page', function (done) {
            request({url: url + '/to', headers: { Accept: 'text/html'}},
                function (error, response, body) {
                    response.statusCode.should.eql(200);
                    done();
                });
        });                        
        it('date should work', function (done) {
            request({url: url + '/to/20131225', headers: { Accept: 'application/json'}},
                function (error, response, body) {
                    response.statusCode.should.eql(200);
                    var data = JSON.parse(body);
                    fixData(data);
                    data.should.eql({
                        date: "2013-12-25T00:00:00.000Z",
                        event: "",
                        unit: "s",
                        tick: "true",
                        msg: "Time is up:",
                        css: "",
                        overflow: false,
                        warning: [],                        
                        datereadable: "2013-12-25 00:00:00"
                    });
                    done();
                });
        });        
        it('event at date should work', function (done) {
            request({url: url + '/to/Christmas/at/20131225', headers: { Accept: 'application/json'}},
                function (error, response, body) {
                    response.statusCode.should.eql(200);
                    var data = JSON.parse(body);
                    fixData(data);
                    data.should.eql({
                        date: "2013-12-25T00:00:00.000Z",
                        event: "Christmas",
                        unit: "s",
                        tick: "true",
                        msg: "Time is up:",
                        css: "",
                        overflow: false,
                        warning: [],
                        datereadable: "2013-12-25 00:00:00"
                    });
                    done();
                });
        });
        it('event on date should work', function (done) {
            request({url: url + '/to/Christmas/on/20131225', headers: { Accept: 'application/json'}},
                function (error, response, body) {
                    response.statusCode.should.eql(200);
                    var data = JSON.parse(body);
                    fixData(data);
                    data.should.eql({
                        date: "2013-12-25T00:00:00.000Z",
                        event: "Christmas",
                        unit: "s",
                        tick: "true",
                        msg: "Time is up:",
                        css: "",
                        overflow: false,
                        warning: [],
                        datereadable: "2013-12-25 00:00:00"
                    });
                    done();
                });
        });        

        //TODO: - do proper UI tests
        it('should work for HTML', function (done) {
            request({url: url + '/to/Christmas/at/20131225', headers: { Accept: 'text/html'}},
                function (error, response, body) {
                    response.statusCode.should.eql(200);
                    done();
                });
        });        
        it('should work for HTML with tick', function (done) {
            request({url: url + '/to/Christmas/at/20131225?tick=false', headers: { Accept: 'text/html'}},
                function (error, response, body) {
                    response.statusCode.should.eql(200);
                    done();
                });
        });                
    });       
});

function fixData(data) {
    //This is a hack for now as date will change
    delete data.amount;
    delete data.remaining;
    delete data.amountreadable;
    delete data.amountms;
}
