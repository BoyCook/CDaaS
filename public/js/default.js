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

	var warning = contains(data.warning, cnt);
	if (warning) {
		$('body').css('background-color', warning.colour);
	}
}

function gotData(res, status, xhr) {
	data = res;
	var params = {
		target: 0,
		cnt: data.remaining,
		finished: finished,
		setValue: setValue
	};
	var countDown = new CountDown(params);
	countDown.start()
}

function contains(items, time) {
    for (var i=0,len=items.length; i < len; i++) {
    	var item = items[i];
        if (item.ms == time) {
            return item;
        }
    }    
    return undefined;	
}

if(typeof String.prototype.trim !== 'function') {
	String.prototype.trim = function() {
		return this.replace(/^\s+|\s+$/g, '');
	}
}

$(document).ready(function () {
	core = new CDaaS();
	$.ajaxSetup({ cache: false });
    $.getJSON(document.location.pathname + document.location.search, gotData);   
});
