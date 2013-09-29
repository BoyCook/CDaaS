var core = undefined;
var data = undefined;

function finished() {
	$('.amount').text(data.msg);
	$('.desc').html('');
}

function setValue(cnt) {
	var amount = core.parseAmount(cnt);
	data.remaining = cnt;
	var text = core.getAmountReadable(amount.years, 
								         amount.days, 
								         amount.hours, 
								         amount.minutes, 
								         amount.seconds)
	$('.amount').text(text);	

	if (contains(data.warning, cnt)) {
		$('.warning').text('Warning - ');
	}
}

function gotData(response) {
	data = response;
	var params = {
		target: 0,
		cnt: data.remaining,
		finished: finished,
		setValue: setValue
	};
	var countDown = new CountDown(params);
	countDown.start()
}

function contains(items, item) {
    for (var i=0,len=items.length; i < len; i++) {
        if (items[i] == item) {
            return true;
        }
    }    
    return false;	
}

$(document).ready(function () {
	core = new CDaaS();
    $.getJSON(document.location.pathname + document.location.search, gotData);
});
