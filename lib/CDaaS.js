
function CDaaS() {
}

CDaaS.prototype.getAmountFromDate = function(date) {
	return this.getAmountBetweenDates(date, new Date());
};

CDaaS.prototype.getAmountBetweenDates = function(now, then) {
	return now - then;
};

CDaaS.prototype.getAmountReadable = function(amount) {
    //TODO divide amount by 1000 factor for improved performance
    var oneYear = 31536000000;
    var oneDay = 86400000
    var oneHour = 3600000;
    var oneMinute = 60000;
    var oneSecond = 1000;
    var years = Math.floor(amount/oneYear);
    var days = Math.floor((amount - (oneYear*years))/oneDay);
	var hours = Math.floor((amount - (oneYear*years) - (oneDay*days)) /oneHour);
	var minutes = Math.floor((amount - (oneYear*years) - (oneDay*days) - (oneHour*hours)) /oneMinute);
	var seconds = Math.floor((amount - (oneYear*years) - (oneDay*days) - (oneHour*hours) - (oneMinute*minutes)) /oneSecond);

	return this.buildString(years, days, hours, minutes, seconds)
};

CDaaS.prototype.buildString = function(years, days, hours, minutes, seconds) {
    var result = '';
    if (years > 0) {
        result += years + ' years ';
    }
    if (days > 0) {
        result += days + ' days ';
    }    
    if (hours > 0) {
        result += hours + ' hours ';
    }    
    if (minutes > 0) {
        result += minutes + ' minutes ';
    }    
    if (seconds > 0) {
        result += seconds + ' seconds';
    }        
    return result.trim();
};

CDaaS.prototype.parseDate = function(date) {
    // Converts "YYYYMMddHHmmss" to "YYYY-MM-dd HH:mm:ss"
    return new Date(date.substring(0, 4) + '-' + 
                    date.substring(4, 6) + '-' + 
                    date.substring(6, 8) + ' ' + 
                    date.substring(8, 10) + ':' + 
                    date.substring(10, 12) + ':' + 
                    date.substring(12, 14));
};

exports.CDaaS = CDaaS;
