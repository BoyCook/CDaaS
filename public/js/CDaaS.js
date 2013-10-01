
function CDaaS() {
    this.one = {
        year: 31536000000,
        day: 86400000,
        hour: 3600000,
        minute: 60000,
        second: 1000   
    };
}

CDaaS.prototype.getAmountFromDate = function(date) {
	return this.getAmountBetweenDates(date, new Date());
};

CDaaS.prototype.getAmountBetweenDates = function(now, then) {
	return now - then;
};

CDaaS.prototype.parseMS = function(amount) {
    //TODO consider performance improvements
    var years = Math.floor(amount/this.one.year);
    var lessYears = amount - (this.one.year*years);
    var days = Math.floor(lessYears / this.one.day);
    var lessDays = lessYears - (this.one.day*days);
    var hours = Math.floor(lessDays / this.one.hour);
    var lessHours = lessDays - (this.one.hour*hours);
    var minutes = Math.floor(lessHours / this.one.minute);
    var lessMinutes = lessHours - (this.one.minute*minutes);
    var seconds = Math.floor(lessMinutes / this.one.second);
    var lessSeconds = lessMinutes - (this.one.second*seconds);
    var milliseconds = lessSeconds;
    return {
        years: years,
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
        milliseconds: milliseconds
    }
};

CDaaS.prototype.getAmountReadable = function(years, days, hours, minutes, seconds) {
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
                        date.substring(4, 6) + '-01 00:00:00');
    } else if (date.length == 8) {        
        //YYYYMMdd
        return new Date(date.substring(0, 4) + '-' + 
                        date.substring(4, 6) + '-' + 
                        date.substring(6, 8) + ' 00:00:00');
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

if (!(typeof exports === "undefined")) {
    exports.CDaaS = CDaaS;
}
