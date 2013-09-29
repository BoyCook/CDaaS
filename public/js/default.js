var core = undefined;
var countdown = undefined;
$(document).ready(function () {
	core = new CDaaS();
    $.getJSON(document.location.pathname + document.location.search, function(data) {
    	countdown = data;
        var params = {
			target: 0,
			cnt: data.remaining,
			setValue: function(cnt) {
				var amount = core.parseAmount(cnt);
				countdown.remaining = cnt;
				$('.amount').text(core.getAmountReadable(amount.years, 
												         amount.days, 
												         amount.hours, 
												         amount.minutes, 
												         amount.seconds));
			}
        };
        var countDown = new CountDown(params);
        countDown.start()
    });
});
