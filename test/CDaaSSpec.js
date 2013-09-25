var should = require('should');
var CDaaS = require('../lib/CDaaS').CDaaS;

describe('CDaaS', function () {
	var core = undefined;
	before(function() {
		core = new CDaaS();
	});

    describe('#getAmountFromDate', function () {

    });

    describe('#getAmountReadable', function () {
        it('should work', function () {
            var amount = core.
            	getAmountBetweenDates(new Date('2013-09-25 15:40'), new Date('2013-09-22 13:00'));
            var readable = core.getAmountReadable(amount);
            console.log('Readable [%s]', readable);
        });
    });    
});
