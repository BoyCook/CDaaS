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
            readable.should.eql('1 years 298 days 21 hours 42 minutes 5 seconds');
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
});
