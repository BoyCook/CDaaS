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
        it('should work for years', function () {
            var amount = core.getAmountBetweenDates(new Date('2013-09-25 15:42:06'), new Date('2011-12-01 17:00:01'));
            amount.should.eql(57361325000);
            // new Date().getTimezoneOffset();
            // var t1 = now.getTime();
            // var t2 = then.getTime();            
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
            var amount = core.parseAmount(57361325000);
            amount.should.eql({ years: 1, days: 298, hours: 21, minutes: 42, seconds: 5 });
        });
    });

    describe('#getAmountReadable', function () {
        it('should work for years', function () {
            var readable = core.getAmountReadable(57361325000);
            readable.should.eql('1 year 298 days 21 hours 42 minutes 5 seconds');
        });
        it('should work for days', function () {
            var readable = core.getAmountReadable(254525000);
            readable.should.eql('2 days 22 hours 42 minutes 5 seconds');
        });        
        it('should work for hours', function () {
            var readable = core.getAmountReadable(9725000);
            readable.should.eql('2 hours 42 minutes 5 seconds');
        });                
        it('should work for minutes', function () {
            var readable = core.getAmountReadable(125000);
            readable.should.eql('2 minutes 5 seconds');
        });                
        it('should work for seconds', function () {
            var readable = core.getAmountReadable(5000);
            readable.should.eql('5 seconds');
        });                
    });    

    describe('#getAmountReadable', function() {
        it('should include year when present', function () {
            var result = core.getAmountReadable(1, 0, 0, 0, 0);
            result.should.eql('1 year');
        });
        it('should include years when present', function () {
            var result = core.getAmountReadable(2, 0, 0, 0, 0);
            result.should.eql('2 years');
        });        
        it('should include day when present', function () {
            var result = core.getAmountReadable(0, 1, 0, 0, 0);
            result.should.eql('1 day');
        });
        it('should include days when present', function () {
            var result = core.getAmountReadable(0, 2, 0, 0, 0);
            result.should.eql('2 days');
        });        
        it('should include day when present', function () {
            var result = core.getAmountReadable(0, 0, 1, 0, 0);
            result.should.eql('1 hour');
        });
        it('should include days when present', function () {
            var result = core.getAmountReadable(0, 0, 2, 0, 0);
            result.should.eql('2 hours');
        });        
        it('should include day when present', function () {
            var result = core.getAmountReadable(0, 0, 0, 1, 0);
            result.should.eql('1 minute');
        });
        it('should include days when present', function () {
            var result = core.getAmountReadable(0, 0, 0, 2, 0);
            result.should.eql('2 minutes');
        });                        
        it('should include day when present', function () {
            var result = core.getAmountReadable(0, 0, 0, 0, 1);
            result.should.eql('1 second');
        });
        it('should include days when present', function () {
            var result = core.getAmountReadable(0, 0, 0, 0, 2);
            result.should.eql('2 seconds');
        });                
    });

    describe('#parseDate', function() {
        it('should work for a date string', function(){
            var expected = new Date('2013-09-25 15:01');
            var result = core.parseDate('201309251501');
            result.should.eql(expected);
        });
    });    
});
