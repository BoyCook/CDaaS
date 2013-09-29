var should = require('should');
var CDaaS = require('../public/js/CDaaS').CDaaS;

describe('CDaaS', function () {
	var core = undefined;
	before(function() {
		core = new CDaaS();
	});

    describe('#getAmountFromDate', function () {
        // Tricky to test - uses now
    });

    describe('#getAmountBetweenDates', function () {
        it.skip('should work for years', function () {
            var amount = core.getAmountBetweenDates(new Date('2013-09-25 15:42:06'), new Date('2011-12-01 17:00:01'));
            amount.should.eql(57361325000);
            //TODO - use Date().getTimezoneOffset();
        });
        it('should work for days', function () {
            var amount = core.getAmountBetweenDates(new Date('2013-09-25 15:42:06'), new Date('2013-09-22 17:00:01'));
            amount.should.eql(254525000);
        });        
        it('should work for hours', function () {
            var amount = core.getAmountBetweenDates(new Date('2013-09-25 15:42:06'), new Date('2013-09-25 13:00:01'));
            amount.should.eql(9725000);
        });                
        it('should work for minutes', function () {
            var amount = core.getAmountBetweenDates(new Date('2013-09-25 15:42:06'), new Date('2013-09-25 15:40:01'));
            amount.should.eql(125000);
        });                
        it('should work for seconds', function () {
            var amount = core.getAmountBetweenDates(new Date('2013-09-25 15:40:06'), new Date('2013-09-25 15:40:01'));
            amount.should.eql(5000);
        });                
    });

    describe('#parseAmount', function () {
        it('should work for years', function () {
            var amount = core.parseAmount(57361325500);
            amount.should.eql({ years: 1, days: 298, hours: 21, minutes: 42, seconds: 5, milliseconds: 500 });
        });
    });

    describe('#getAmountReadable', function () {
        it('should include years', function () {
            var readable = core.getAmountReadable(1, 298, 21, 42, 5);
            readable.should.eql('1 year 298 days 21 hours 42 minutes 5 seconds');
        });
        it('should include days', function () {
            var readable = core.getAmountReadable(0, 2, 22, 42, 5);
            readable.should.eql('2 days 22 hours 42 minutes 5 seconds');
        });        
        it('should include hours', function () {
            var readable = core.getAmountReadable(0, 0, 2, 42, 5);
            readable.should.eql('2 hours 42 minutes 5 seconds');
        });                
        it('should include minutes', function () {
            var readable = core.getAmountReadable(0, 0, 0, 2, 5);
            readable.should.eql('2 minutes 5 seconds');
        });                
        it('should include seconds', function () {
            var readable = core.getAmountReadable(0, 0, 0, 0, 5);
            readable.should.eql('5 seconds');
        });                
        it('should just just show year when present', function () {
            var result = core.getAmountReadable(1, 0, 0, 0, 0);
            result.should.eql('1 year');
        });
        it('should just show years when present', function () {
            var result = core.getAmountReadable(2, 0, 0, 0, 0);
            result.should.eql('2 years');
        });        
        it('should just show day when present', function () {
            var result = core.getAmountReadable(0, 1, 0, 0, 0);
            result.should.eql('1 day');
        });
        it('should just show days when present', function () {
            var result = core.getAmountReadable(0, 2, 0, 0, 0);
            result.should.eql('2 days');
        });        
        it('should just show hour when present', function () {
            var result = core.getAmountReadable(0, 0, 1, 0, 0);
            result.should.eql('1 hour');
        });
        it('should just show hours when present', function () {
            var result = core.getAmountReadable(0, 0, 2, 0, 0);
            result.should.eql('2 hours');
        });        
        it('should just show minute when present', function () {
            var result = core.getAmountReadable(0, 0, 0, 1, 0);
            result.should.eql('1 minute');
        });
        it('should just show minutes when present', function () {
            var result = core.getAmountReadable(0, 0, 0, 2, 0);
            result.should.eql('2 minutes');
        });                        
        it('should just show second when present', function () {
            var result = core.getAmountReadable(0, 0, 0, 0, 1);
            result.should.eql('1 second');
        });
        it('should just show seconds when present', function () {
            var result = core.getAmountReadable(0, 0, 0, 0, 2);
            result.should.eql('2 seconds');
        });                
    });

    describe('#parseDate', function() {
        it('should work for up to seconds', function(){
            var expected = new Date('2013-09-25 15:01:02');
            var result = core.parseDate('20130925150102');
            result.should.eql(expected);
        });        
        it('should work for up to minutes', function(){
            var expected = new Date('2013-09-25 15:01');
            var result = core.parseDate('201309251501');
            result.should.eql(expected);
        });
        it('should work for up to hour', function(){
            var expected = new Date('2013-09-25 15:00');
            var result = core.parseDate('2013092515');
            result.should.eql(expected);
        });                
        it('should work for up to day', function(){
            var expected = new Date('2013-09-25 00:00');
            var result = core.parseDate('20130925');
            result.should.eql(expected);
        });
        it('should work for up to month', function(){
            var expected = new Date('2013-09-01 00:00');
            var result = core.parseDate('201309');
            result.should.eql(expected);
        });                
        it('should work for up to year', function(){
            var expected = new Date('2013-01-01 00:00');
            var result = core.parseDate('2013');
            result.should.eql(expected);
        });        
    });    
});
