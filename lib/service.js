
var CDaaS = require('./CDaaS').CDaaS;
var Handlebars = require('handlebars');
var fs = require('fs');
var core = new CDaaS();

function Service() {
}

Service.prototype.toDate = function(req, res) {
    var data = getDefaultResponseModel();
    data.date = core.parseDate(req.params.date); 
    data.datereadable = core.getDateReadable(data.date);
    data.amount = core.getAmountFromDate(new Date(data.date));
    data.remaining = core.getAmountFromDate(new Date(data.date));
    data.amountreadable = core.getAmountReadable(data.amount);    
    doResponse(req, res, data);
};

Service.prototype.toEventAtDate = function(req, res) {
    var data = getDefaultResponseModel();
    data.date = core.parseDate(req.params.date); 
    data.datereadable = core.getDateReadable(data.date);
    data.event = req.params.event;
    data.amount = core.getAmountFromDate(new Date(data.date));
    data.remaining = core.getAmountFromDate(new Date(data.date));
    data.amountreadable = core.getAmountReadable(data.amount);
    doResponse(req, res, data);
};

Service.prototype.fromAmount = function(req, res) {
    var data = getDefaultResponseModel();
    data.amount = req.params.timeamount; 
    data.remaining = data.amount;
    data.amountreadable = core.getAmountReadable(data.amount);
    doResponse(req, res, data);
};

Service.prototype.fromAmountForEvent = function(req, res) {
    var data = getDefaultResponseModel();
    data.amount = req.params.timeamount; 
    data.event = req.params.event;
    data.remaining = data.amount;
    data.amountreadable = core.getAmountReadable(data.amount);    
    doResponse(req, res, data);
};

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
    var template = Handlebars.compile(fs.readFileSync('./template/result.html', 'utf-8'));
    return template(data);
}   

function getDefaultResponseModel() {
    return {
        date: '',
        event: '',
        amount: '',
        remaining: '',
        unit: 'ms'
        // Plus any params
    }
}

exports.Service = Service;
