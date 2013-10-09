var core = undefined;
var data = undefined;

function finished() {
	$('.amount').text(data.msg);
	$('title').text(data.msg);
	$('.desc').html('');
}

function setValue(cnt) {
	var amount = core.parseMS(cnt);
	data.remaining = cnt;
	var text = core.getAmountReadable(amount.years, 
								         amount.days, 
								         amount.hours, 
								         amount.minutes, 
								         amount.seconds);
	var shortText = core.getAmountReadableVeryShort(amount.years, 
								         amount.days, 
								         amount.hours, 
								         amount.minutes, 
								         amount.seconds);
	$('title').text(shortText);
	$('.amount').text(text);	
	var warning = contains(data.warning, cnt);
	if (warning) {
		$('body').css('background-color', warning.colour);
	}
}

function gotData(res, status, xhr) {
	data = res;
	var params = {
		target: data.target,
		cnt: data.cnt,
		finished: finished,
		setValue: setValue
	};
	var timer = new Counter(params);
	timer.start();
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

function qsJSON() {
	var qs = {};
	if (document.location.search && document.location.search.length > 1) {
		var params = document.location.search.substring(1).split('&');
		for (var i=0,len=params.length; i<len; i++) {
			var item = params[i].split('=');
			qs[item[0]] = item[1];
		}
	}	
	return qs;
}

if(typeof String.prototype.trim !== 'function') {
	String.prototype.trim = function() {
		return this.replace(/^\s+|\s+$/g, '');
	}
}

$(document).ready(function () {
	core = new CDaaS();
	$.ajaxSetup({ cache: false });
	var qs = qsJSON();
    $.getJSON(document.location.pathname + document.location.search, gotData);   
	if (qs.discreet) {
		document.location.search = '';
	}    
});
