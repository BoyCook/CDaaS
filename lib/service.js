
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

function readToData(data, date) {
    data.date = core.parseDate(date);
    data.datereadable = core.getDateReadable(data.date);
    data.amountms = core.getAmountFromDate(new Date(data.date));
    data.remaining = data.amountms;
    data.amount = core.parseAmount(data.amountms);
    data.amountreadable = core.getAmountReadable(data.amount.years, 
        data.amount.days, 
        data.amount.hours, 
        data.amount.minutes, 
        data.amount.seconds);    
}

function readFromData(data, timeamount) {
    data.amountms = timeamount; 
    data.remaining = data.amountms;
    data.amount = core.parseAmount(data.amountms);
    data.amountreadable = core.getAmountReadable(data.amount.years, 
        data.amount.days, 
        data.amount.hours, 
        data.amount.minutes, 
        data.amount.seconds);    
}

function readQSParams(req, data) {
    data.tick = req.query.tick ? req.query.tick : data.tick;
    data.unit = req.query.unit ? req.query.unit : data.unit;
    data.msg = req.query.msg ? req.query.msg : data.msg;
    data.css = req.query.css ? req.query.css : data.css;
}

function doResponse(req, res, data) {
    //TODO: default to 'text/html' for browser
    var accept = req.headers['accept'].split(',')[0];
    res.setHeader('Content-Type', accept);
    res.setHeader('Content-Length', data.length);
    res.send(marshalData(accept, data));    
}

function marshalData(type, data) {
    if (type === 'text/html') {
        return marshalHTML(data);
    } else {
        return JSON.stringify(data);
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
        event: 'Finish',
        amount: '',
        remaining: '',
        unit: 'ms',
        tick: 'false',
        msg: '',
        css: ''
    }
}

exports.Service = Service;
