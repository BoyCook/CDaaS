var should = require('should');
var request = require('request');
var url = 'http://localhost:8080';
var Server = require('../lib/server');

describe('CountDown', function () {
    before(function (done) {
        Server.startUp({ port: process.env.PORT || 8080 }, done);
    });

    after(function (done) {
        Server.shutDown(done);
    });

    describe('#to', function () {
        it('date should work', function (done) {
            request({url: url + '/to/20131225', headers: { Accept: 'application/json'}},
                function (error, response, body) {
                    response.statusCode.should.eql(200);
                    // body.should.eql(expected.dir.html);
                    done();
                });
        });        
        it('event at date should work', function (done) {
            request({url: url + '/to/Christmas/at/20131225', headers: { Accept: 'application/json'}},
                function (error, response, body) {
                    response.statusCode.should.eql(200);
                    // body.should.eql(expected.dir.html);
                    done();
                });
        });
        it('event on date should work', function (done) {
            request({url: url + '/to/Christmas/on/20131225', headers: { Accept: 'application/json'}},
                function (error, response, body) {
                    response.statusCode.should.eql(200);
                    // body.should.eql(expected.dir.html);
                    done();
                });
        });        
    });

    describe('#from', function () {
        it('time amount should work', function (done) {
            request({url: url + '/from/10000', headers: { Accept: 'application/json'}},
                function (error, response, body) {
                    response.statusCode.should.eql(200);
                    // body.should.eql(expected.dir.html);
                    done();
                });
        });        
        it('time amount for event should work', function (done) {
            request({url: url + '/from/10000/for/End of meeting', headers: { Accept: 'application/json'}},
                function (error, response, body) {
                    response.statusCode.should.eql(200);
                    // body.should.eql(expected.dir.html);
                    done();
                });
        });
    });    
});
