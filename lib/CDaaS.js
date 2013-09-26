
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
    if (this.greaterThanZero(years)) {
        result += this.timeUnit(years, 'year');
    }
    if (this.greaterThanZero(days)) {
        result += this.timeUnit(days, 'day');
    }    
    if (this.greaterThanZero(hours)) {
        result += this.timeUnit(hours, 'hour');
    }    
    if (this.greaterThanZero(minutes)) {
        result += this.timeUnit(minutes, 'minute');
    }    
    if (this.greaterThanZero(seconds)) {
        result += this.timeUnit(seconds, 'second');
    }        
    return result.trim();
};

CDaaS.prototype.timeUnit = function(i, unit) {
    if (i == 1) {
        return i + ' ' + unit + ' ';
    } else {
        return i + ' ' + unit + 's ';
    }
};

CDaaS.prototype.greaterThanZero = function(i) {
    return (i !== "undefined" && i > 0);
};

CDaaS.prototype.getDateReadable = function(date) {
    return date.getFullYear() + '-' +
        this.toFull((date.getMonth() + 1).toString()) + '-' +
        this.toFull(date.getDate().toString()) + ' ' +
        this.toFull(date.getHours().toString()) + ':' +
        this.toFull(date.getMinutes().toString()) + ':' +
        this.toFull(date.getSeconds().toString());
};

CDaaS.prototype.parseDate = function(date) {
    //TODO: do this algorithmically
    if (date.length == 4) {
        //YYYY
        return new Date(date.substring(0, 4));
    } else if (date.length == 6) {
        //YYYYMM
        return new Date(date.substring(0, 4) + '-' + 
                        date.substring(4, 6));
    } else if (date.length == 8) {        
        //YYYYMMdd
        return new Date(date.substring(0, 4) + '-' + 
                        date.substring(4, 6) + '-' + 
                        date.substring(6, 8));        
    } else if (date.length == 10) {                
        //YYYYMMddHHmmss
        return new Date(date.substring(0, 4) + '-' + 
                        date.substring(4, 6) + '-' + 
                        date.substring(6, 8) + ' ' + 
                        date.substring(8, 10) + ':00:00');        
    } else if (date.length == 12) {                        
        //YYYYMMddHHmmss
        return new Date(date.substring(0, 4) + '-' + 
                        date.substring(4, 6) + '-' + 
                        date.substring(6, 8) + ' ' + 
                        date.substring(8, 10) + ':' + 
                        date.substring(10, 12) + ':00');        
    } else if (date.length == 14) {                                
        // Converts "YYYYMMddHHmmss" to "YYYY-MM-dd HH:mm:ss"
        return new Date(date.substring(0, 4) + '-' + 
                        date.substring(4, 6) + '-' + 
                        date.substring(6, 8) + ' ' + 
                        date.substring(8, 10) + ':' + 
                        date.substring(10, 12) + ':' + 
                        date.substring(12, 14));
    } else {
        throw Error('Invalid date format [%s]', date);
    }

};

CDaaS.prototype.toFull = function(v) {
    if (v.length == 1) {
        v = "0" + v;
    }
    return v;
};

exports.CDaaS = CDaaS;
