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

    describe('#to', function () {
        it('date should work', function (done) {
            request({url: url + '/to/20131225', headers: { Accept: 'application/json'}},
                function (error, response, body) {
                    response.statusCode.should.eql(200);
                    var data = JSON.parse(body);
                    fixData(data);
                    data.should.eql({
                        date: "2013-12-25T00:00:00.000Z",
                        event: "Finish",
                        unit: "ms",
                        tick: "false",
                        msg: "Countdown complete",
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
                        unit: "ms",
                        tick: "false",
                        msg: "Countdown complete",
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
                        unit: "ms",
                        tick: "false",
                        msg: "Countdown complete",
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
            request({url: url + '/to/Christmas/at/20131225?tick=true', headers: { Accept: 'text/html'}},
                function (error, response, body) {
                    response.statusCode.should.eql(200);
                    done();
                });
        });                
    });

    describe('#from', function () {
        it('time amount should work', function (done) {
            request({url: url + '/from/10000', headers: { Accept: 'application/json'}},
                function (error, response, body) {
                    response.statusCode.should.eql(200);
                    var data = JSON.parse(body);
                    fixData(data);
                    data.should.eql({
                        date: "",
                        event: "Finish",
                        unit: "ms",
                        tick: "false",
                        msg: "Countdown complete",
                        css: "",
                        overflow: false,
                        warning: []
                    });
                    done();
                });
        });        
        it('time amount for event should work', function (done) {
            request({url: url + '/from/10000/for/End of meeting', headers: { Accept: 'application/json'}},
                function (error, response, body) {
                    response.statusCode.should.eql(200);
                    var data = JSON.parse(body);
                    fixData(data);
                    data.should.eql({
                        date: "",
                        event: "End of meeting",
                        unit: "ms",
                        tick: "false",
                        msg: "Countdown complete",
                        css: "",
                        overflow: false,
                        warning: []
                    });
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
