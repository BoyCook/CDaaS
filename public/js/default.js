$(document).ready(function () {
	var core = new CDaaS();
    $.getJSON(document.location.pathname, function(data) {
        var params = {
			target: 0,
			cnt: data.remaining,
			setValue: function(cnt) {
				$('.amount').text(core.getAmountReadable(cnt));
			}
        };
        var countDown = new CountDown(params);
        countDown.start()
    });
});
