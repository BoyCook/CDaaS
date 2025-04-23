var should = require('should');
var CDaaS = require('../public/js/CDaaS').CDaaS;

describe('CDaaS', () => {
	var core = undefined;
	beforeEach(() =>  {
		core = new CDaaS();
	});

    describe('#getAmountFromDate', () => {
        // Tricky to test - uses now
    });

    describe('#getAmountBetweenDates', () => {
        it.skip('should work for years', () => {
            var amount = core.getAmountBetweenDates(new Date('2013-09-25 15:42:06'), new Date('2011-12-01 17:00:01'));
            amount.should.eql(57361325000);
            //TODO - use Date().getTimezoneOffset();
        });
        it('should work for days', () => {
            var amount = core.getAmountBetweenDates(new Date('2013-09-25 15:42:06'), new Date('2013-09-22 17:00:01'));
            amount.should.eql(254525000);
        });        
        it('should work for hours', () => {
            var amount = core.getAmountBetweenDates(new Date('2013-09-25 15:42:06'), new Date('2013-09-25 13:00:01'));
            amount.should.eql(9725000);
        });                
        it('should work for minutes', () => {
            var amount = core.getAmountBetweenDates(new Date('2013-09-25 15:42:06'), new Date('2013-09-25 15:40:01'));
            amount.should.eql(125000);
        });                
        it('should work for seconds', () => {
            var amount = core.getAmountBetweenDates(new Date('2013-09-25 15:40:06'), new Date('2013-09-25 15:40:01'));
            amount.should.eql(5000);
        });                
    });

    describe('#parseMS', () => {
        it('should work for years', () => {
            var amount = core.parseMS(57361325500);
            amount.should.eql({ years: 1, days: 298, hours: 21, minutes: 42, seconds: 5, milliseconds: 500 });
        });
    });

    describe('#getAmountReadable', () => {
        it('should include years', () => {
            var readable = core.getAmountReadable(1, 298, 21, 42, 5);
            readable.should.eql('1 year 298 days 21 hours 42 minutes 5 seconds');
        });
        it('should include days', () => {
            var readable = core.getAmountReadable(0, 2, 22, 42, 5);
            readable.should.eql('2 days 22 hours 42 minutes 5 seconds');
        });        
        it('should include hours', () => {
            var readable = core.getAmountReadable(0, 0, 2, 42, 5);
            readable.should.eql('2 hours 42 minutes 5 seconds');
        });                
        it('should include minutes', () => {
            var readable = core.getAmountReadable(0, 0, 0, 2, 5);
            readable.should.eql('2 minutes 5 seconds');
        });                      
        it('should just show year when present', () => {
            var result = core.getAmountReadable(1, 0, 0, 0, 0);
            result.should.eql('1 year');
        });
        it('should just show years when present', () => {
            var result = core.getAmountReadable(2, 0, 0, 0, 0);
            result.should.eql('2 years');
        });        
        it('should just show day when present', () => {
            var result = core.getAmountReadable(0, 1, 0, 0, 0);
            result.should.eql('1 day');
        });
        it('should just show days when present', () => {
            var result = core.getAmountReadable(0, 2, 0, 0, 0);
            result.should.eql('2 days');
        });        
        it('should just show hour when present', () => {
            var result = core.getAmountReadable(0, 0, 1, 0, 0);
            result.should.eql('1 hour');
        });
        it('should just show hours when present', () => {
            var result = core.getAmountReadable(0, 0, 2, 0, 0);
            result.should.eql('2 hours');
        });        
        it('should just show minute when present', () => {
            var result = core.getAmountReadable(0, 0, 0, 1, 0);
            result.should.eql('1 minute');
        });
        it('should just show minutes when present', () => {
            var result = core.getAmountReadable(0, 0, 0, 2, 0);
            result.should.eql('2 minutes');
        });                        
        it('should just show second when present', () => {
            var result = core.getAmountReadable(0, 0, 0, 0, 1);
            result.should.eql('1 second');
        });
        it('should just show seconds when present', () => {
            var result = core.getAmountReadable(0, 0, 0, 0, 2);
            result.should.eql('2 seconds');
        });                
    });

    describe('#getAmountReadableShort', () => {
        it('should include years', () => {
            var readable = core.getAmountReadableShort(1, 298, 21, 42, 5);
            readable.should.eql('1 y 298 d 21 h 42 m 5 s');
        });
        it('should include days', () => {
            var readable = core.getAmountReadableShort(0, 2, 22, 42, 5);
            readable.should.eql('2 d 22 h 42 m 5 s');
        });        
        it('should include hours', () => {
            var readable = core.getAmountReadableShort(0, 0, 2, 42, 5);
            readable.should.eql('2 h 42 m 5 s');
        });                
        it('should include minutes', () => {
            var readable = core.getAmountReadableShort(0, 0, 0, 2, 5);
            readable.should.eql('2 m 5 s');
        });                
        it('should just show y for year', () => {
            var result = core.getAmountReadableShort(1, 0, 0, 0, 0);
            result.should.eql('1 y');
        });
        it('should just show y for years', () => {
            var result = core.getAmountReadableShort(2, 0, 0, 0, 0);
            result.should.eql('2 y');
        });        
        it('should just show d for day', () => {
            var result = core.getAmountReadableShort(0, 1, 0, 0, 0);
            result.should.eql('1 d');
        });
        it('should just show d for days', () => {
            var result = core.getAmountReadableShort(0, 2, 0, 0, 0);
            result.should.eql('2 d');
        });        
        it('should just show h for hour', () => {
            var result = core.getAmountReadableShort(0, 0, 1, 0, 0);
            result.should.eql('1 h');
        });
        it('should just show h for hours', () => {
            var result = core.getAmountReadableShort(0, 0, 2, 0, 0);
            result.should.eql('2 h');
        });        
        it('should just show m for minute', () => {
            var result = core.getAmountReadableShort(0, 0, 0, 1, 0);
            result.should.eql('1 m');
        });
        it('should just show m for minutes', () => {
            var result = core.getAmountReadableShort(0, 0, 0, 2, 0);
            result.should.eql('2 m');
        });                        
        it('should just show s for second', () => {
            var result = core.getAmountReadableShort(0, 0, 0, 0, 1);
            result.should.eql('1 s');
        });
        it('should just show s for seconds', () => {
            var result = core.getAmountReadableShort(0, 0, 0, 0, 2);
            result.should.eql('2 s');
        });                
    });

    describe('#getAmountReadableVeryShort', () => {
        it('should include years', () => {
            var readable = core.getAmountReadableVeryShort(1, 298, 21, 42, 5);
            readable.should.eql('1:298:21:42:5');
        });
        it('should include days', () => {
            var readable = core.getAmountReadableVeryShort(0, 2, 22, 42, 5);
            readable.should.eql('2:22:42:5');
        });        
        it('should include hours', () => {
            var readable = core.getAmountReadableVeryShort(0, 0, 2, 42, 5);
            readable.should.eql('2:42:5');
        });                
        it('should include minutes', () => {
            var readable = core.getAmountReadableVeryShort(0, 0, 0, 2, 5);
            readable.should.eql('2:5');
        });                            
        it('should include seconds', () => {
            var readable = core.getAmountReadableVeryShort(0, 0, 0, 0, 5);
            readable.should.eql('5');
        });                                 
    });

    describe('#parseDate', () =>  {
        it('should work for up to seconds', () => {
            var expected = new Date('2013-09-25 15:01:02');
            var result = core.parseDate('20130925150102');
            result.should.eql(expected);
        });        
        it('should work for up to minutes', () => {
            var expected = new Date('2013-09-25 15:01');
            var result = core.parseDate('201309251501');
            result.should.eql(expected);
        });
        it('should work for up to hour', () => {
            var expected = new Date('2013-09-25 15:00');
            var result = core.parseDate('2013092515');
            result.should.eql(expected);
        });                
        it('should work for up to day', () => {
            var expected = new Date('2013-09-25 00:00');
            var result = core.parseDate('20130925');
            result.should.eql(expected);
        });
        it('should work for up to month', () => {
            var expected = new Date('2013-09-01 00:00');
            var result = core.parseDate('201309');
            result.should.eql(expected);
        });                
        it('should work for up to year', () => {
            var expected = new Date('2013-01-01 00:00');
            var result = core.parseDate('2013');
            result.should.eql(expected);
        });
        it('should fail for nonsense', () => {
            (() => {
                core.parseDate('1');
            }).should.throw('Invalid date [1]');
        });
    });    
});
