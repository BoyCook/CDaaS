
var CDaaS = require('./CDaaS').CDaaS;
var core = new CDaaS();

function Service() {
}

Service.prototype.toDate = function(req, res) {
    var body = getDefaultResponseModel();
    body.date = core.parseDate(req.params.date); 
    body.amount = core.getAmountFromDate(new Date(body.date));
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Length', body.length);
    res.send(JSON.stringify(body));
};

Service.prototype.toEventAtDate = function(req, res) {
    var body = getDefaultResponseModel();
    body.date = core.parseDate(req.params.date); 
    body.event = req.params.event;
    body.amount = core.getAmountFromDate(new Date(body.date));
    body.amountreadable = core.getAmountReadable(body.amount);
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Length', body.length);
    res.send(JSON.stringify(body));
};

Service.prototype.fromAmount = function(req, res) {
    var body = getDefaultResponseModel();
    body.amount = req.params.timeamount; 
    body.amountreadable = core.getAmountReadable(body.amount);
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Length', body.length);
    res.send(JSON.stringify(body));
};

Service.prototype.fromAmountForEvent = function(req, res) {
    var body = getDefaultResponseModel();
    body.amount = req.params.timeamount; 
    body.event = req.params.event;
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Length', body.length);
    res.send(JSON.stringify(body));
};

function getDefaultResponseModel() {
    return {
        date: '',
        event: '',
        timeamount: '',
        remaining: ''
        // Plus any params
    }
}

exports.Service = Service;
