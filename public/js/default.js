$(document).ready(function () {
	var core = new CDaaS();
    $.getJSON(document.location.pathname, function(data) {
        var params = {
			target: 0,
			cnt: data.remaining,
			setValue: function(cnt) {
				var amount = core.parseAmount(cnt);
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
