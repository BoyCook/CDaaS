
function CDaaS() {
}

CDaaS.prototype.getAmountFromDate = function(date) {
	return this.getAmountBetweenDates(date, new Date());
};

CDaaS.prototype.getAmountBetweenDates = function(now, then) {
	return now - then;
};

CDaaS.prototype.getAmountReadable = function(amount) {
    var oneHour = 3600000;
    var oneMinute = 60000;
    var oneSecond = 1000;
	var hours = Math.floor(amount/oneHour);
	var minutes = Math.floor(amount/oneMinute);
	var seconds = Math.floor(amount/oneSecond);

	//TODO use JSON via fields
	return hours + ' hours ' + minutes + ' minutes ' + seconds + ' seconds';
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
