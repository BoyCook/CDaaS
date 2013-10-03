
var CDaaS = require('../public/js/CDaaS').CDaaS;
var Handlebars = require('handlebars');
var fs = require('fs');
var core = new CDaaS();

function Service() {
}

Service.prototype.toDate = function(req, res) {
    var data = getDefaultResponseModel();
    readQSParams(req, data);
    readToData(data, req.params.date);    
    doResponse(req, res, data);    
};

Service.prototype.toHTML = function(req, res) {
    //TODO - this is bullshit
    htmlResponse(res, './public/html/to.html');
};

Service.prototype.fromHTML = function(req, res) {
    //TODO - this is bullshit
    htmlResponse(res, './public/html/from.html');
};

Service.prototype.upHTML = function(req, res) {
    //TODO - this is bullshit
    htmlResponse(res, './public/html/up.html');
};

Service.prototype.apiHTML = function(req, res) {
    //TODO - this is bullshit
    htmlResponse(res, './public/html/api.html');
};

Service.prototype.toEventAtDate = function(req, res) {
    var data = getDefaultResponseModel();
    readQSParams(req, data);
    readToData(data, req.params.date);
    data.event = req.params.event;
    doResponse(req, res, data);
};

Service.prototype.fromAmount = function(req, res) {
    var data = getDefaultResponseModel();
    readQSParams(req, data);
    readFromData(data, req.params.timeamount);        
    doResponse(req, res, data);
};

Service.prototype.fromAmountForEvent = function(req, res) {
    var data = getDefaultResponseModel();
    readQSParams(req, data);
    readFromData(data, req.params.timeamount);
    data.event = req.params.event;
    doResponse(req, res, data);
};

Service.prototype.upAmount = function(req, res) {
    var data = getDefaultResponseModel();
    readQSParams(req, data);
    readUpData(data, req.params.timeamount);        
    doResponse(req, res, data);
};

Service.prototype.upAmountForEvent = function(req, res) {
    var data = getDefaultResponseModel();
    readQSParams(req, data);
    readUpData(data, req.params.timeamount);        
    data.event = req.params.event;
    doResponse(req, res, data);
};

function readToData(data, date) {
    data.date = core.parseDate(date);
    data.datereadable = core.getDateReadable(data.date);
    data.amountms = core.getAmountFromDate(new Date(data.date));
    data.remaining = data.amountms;
    data.amount = core.parseMS(data.amountms);
    data.cnt = data.remaining;
    data.target = 0;    
    data.amountreadable = core.getAmountReadable(data.amount.years, 
        data.amount.days, 
        data.amount.hours, 
        data.amount.minutes, 
        data.amount.seconds);    
}

function readFromData(data, timeamount) {
    data.amountms = getAmountInMs(timeamount, data.unit);
    data.remaining = data.amountms;
    data.amount = core.parseMS(data.amountms);
    data.cnt = data.remaining;
    data.target = 0;
    data.amountreadable = core.getAmountReadable(data.amount.years, 
        data.amount.days, 
        data.amount.hours, 
        data.amount.minutes, 
        data.amount.seconds);    
}

function readUpData(data, timeamount) {
    readFromData(data, timeamount);
    data.counter = 'CountUp';
    data.cnt = 0;
    data.target = data.remaining;        
}

function readQSParams(req, data) {
    data.tick = req.query.tick ? req.query.tick : data.tick;
    data.unit = req.query.unit ? req.query.unit : data.unit;
    data.msg = req.query.msg ? req.query.msg : data.msg;
    data.css = req.query.css ? req.query.css : data.css;
    data.overflow = req.query.overflow ? req.query.overflow : data.overflow;
    data.warning = req.query.warning ? req.query.warning : data.warning;
    processWarnings(data);
    //TODO - convert warning values to ms
}

function processWarnings(data) {
    //TODO: safe spit the params
    if (data.warning.indexOf(',') > -1) {
        var warning = data.warning.split(',');
        for (var i=0,len=warning.length; i < len; i++) {
            var item = warning[i].split(':');
            var ms = getAmountInMs(item[0], data.unit);
            var colour = item[1];
            warning[i] = {
                ms: ms,
                colour: colour
            };
        }        
        data.warning = warning;        
    }
}

function getAmountInMs(amount, unit) {
    return amount * getUnitFactor(unit);
}

function getUnitFactor(unit) {
    if (unit === 'year' || unit === 'y') {
        return core.one.year;
    } else if (unit === 'day' || unit === 'd') {
        return core.one.day;        
    } else if (unit === 'hour' || unit === 'h') {
        return core.one.hour;                
    } else if (unit === 'minute' || unit === 'm') {
        return core.one.minute;                        
    } else if (unit === 'second' || unit === 's') {
        return core.one.second;                                
    } else {
        //Default to ms
        return 1;
    }
}

function htmlResponse(res, file) {
    var data = fs.readFileSync(file);
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Content-Length', data.length);
    res.end(data);    
}

function doResponse(req, res, data) {
    var type = getContentType(req);
    res.setHeader('Content-Type', type);
    res.setHeader('Content-Length', data.length);
    res.send(marshalData(type, data));    
}

function getContentType(req) {
    return req.accepts(['text/html', 'application/json', 'application/xml']);
}

function marshalData(type, data) {    
    if (type === 'application/json') {
        return JSON.stringify(data);
    } else {
        return marshalHTML(data);
    }
}   

function marshalHTML(data) {
    var template = getTemplate(data);
    return template(data);
}   

//TODO: cache templates
function getTemplate(data) {
    if (data.tick === 'true') {
        return Handlebars.compile(fs.readFileSync('./template/pagetick.html', 'utf-8'));
    } else {
        return Handlebars.compile(fs.readFileSync('./template/page.html', 'utf-8'));
    }
}

function getDefaultResponseModel() {
    return {
        date: '',
        event: '',
        amount: '',
        remaining: '',
        unit: 's',
        tick: 'true',
        msg: 'Time is up:',
        css: '',
        counter: 'CountDown',
        overflow: false,
        warning: []
    }
}

exports.Service = Service;
