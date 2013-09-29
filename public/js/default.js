var core = undefined;
var countdown = undefined;
$(document).ready(function () {
	core = new CDaaS();
    $.getJSON(document.location.pathname + document.location.search, function(data) {
    	countdown = data;
        var params = {
			target: 0,
			cnt: data.remaining,
			finished: function() {
				$('.amount').text(data.msg);
			},
			setValue: function(cnt) {
				var amount = core.parseAmount(cnt);
				countdown.remaining = cnt;
				var text = core.getAmountReadable(amount.years, 
											         amount.days, 
											         amount.hours, 
											         amount.minutes, 
											         amount.seconds)
				$('.amount').text(text);
			}
        };
        var countDown = new CountDown(params);
        countDown.start()
    });
});
