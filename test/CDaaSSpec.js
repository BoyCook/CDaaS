var should = require('should');
var CDaaS = require('../lib/CDaaS').CDaaS;

describe('CDaaS', function () {
	var core = undefined;
	before(function() {
		core = new CDaaS();
	});

    describe('#getAmountFromDate', function () {

    });

    describe('#getAmountBetweenDates', function () {

    });

    describe('#getAmountReadable', function () {
        it('should work for years', function () {
            var amount = core.getAmountBetweenDates(new Date('2013-09-25 15:42:06'), new Date('2011-12-01 17:00:01'));
            var readable = core.getAmountReadable(amount);
            readable.should.eql('1 year 298 days 21 hours 42 minutes 5 seconds');
        });
        it('should work for days', function () {
            var amount = core.getAmountBetweenDates(new Date('2013-09-25 15:42:06'), new Date('2013-09-22 17:00:01'));
            var readable = core.getAmountReadable(amount);
            readable.should.eql('2 days 22 hours 42 minutes 5 seconds');
        });        
        it('should work for hours', function () {
            var amount = core.getAmountBetweenDates(new Date('2013-09-25 15:42:06'), new Date('2013-09-25 13:00:01'));
            var readable = core.getAmountReadable(amount);
            readable.should.eql('2 hours 42 minutes 5 seconds');
        });                
        it('should work for minutes', function () {
            var amount = core.getAmountBetweenDates(new Date('2013-09-25 15:42:06'), new Date('2013-09-25 15:40:01'));
            var readable = core.getAmountReadable(amount);
            readable.should.eql('2 minutes 5 seconds');
        });                
        it('should work for seconds', function () {
            var amount = core.getAmountBetweenDates(new Date('2013-09-25 15:40:06'), new Date('2013-09-25 15:40:01'));
            var readable = core.getAmountReadable(amount);
            readable.should.eql('5 seconds');
        });                
    });    

    describe('#buildString', function() {
        it('include year when present', function () {
            var result = core.buildString(1, 0, 0, 0, 0);
            result.should.eql('1 year');
        });
        it('include years when present', function () {
            var result = core.buildString(2, 0, 0, 0, 0);
            result.should.eql('2 years');
        });        
        it('include day when present', function () {
            var result = core.buildString(0, 1, 0, 0, 0);
            result.should.eql('1 day');
        });
        it('include days when present', function () {
            var result = core.buildString(0, 2, 0, 0, 0);
            result.should.eql('2 days');
        });        
        it('include day when present', function () {
            var result = core.buildString(0, 0, 1, 0, 0);
            result.should.eql('1 hour');
        });
        it('include days when present', function () {
            var result = core.buildString(0, 0, 2, 0, 0);
            result.should.eql('2 hours');
        });        
        it('include day when present', function () {
            var result = core.buildString(0, 0, 0, 1, 0);
            result.should.eql('1 minute');
        });
        it('include days when present', function () {
            var result = core.buildString(0, 0, 0, 2, 0);
            result.should.eql('2 minutes');
        });                        
        it('include day when present', function () {
            var result = core.buildString(0, 0, 0, 0, 1);
            result.should.eql('1 second');
        });
        it('include days when present', function () {
            var result = core.buildString(0, 0, 0, 0, 2);
            result.should.eql('2 seconds');
        });                
    });

    describe('#parseDate', function() {

    });    
});
