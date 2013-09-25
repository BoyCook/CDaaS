
function CDaaS() {
}

CDaaS.prototype.toDate = function(req, res) {
    var body = getDefaultResponseModel();
	body.date = req.params.date; 
  	res.setHeader('Content-Type', 'application/json');
  	res.setHeader('Content-Length', body.length);
  	res.send(JSON.stringify(body));
};

CDaaS.prototype.toEventAtDate = function(req, res) {
	var body = getDefaultResponseModel();
	body.date = req.params.date; 
	body.event = req.params.event;
  	res.setHeader('Content-Type', 'application/json');
  	res.setHeader('Content-Length', body.length);
  	res.send(JSON.stringify(body));
};

CDaaS.prototype.fromAmount = function(req, res) {
	var body = getDefaultResponseModel();
	body.amount = req.params.timeamount; 
  	res.setHeader('Content-Type', 'application/json');
  	res.setHeader('Content-Length', body.length);
  	res.send(JSON.stringify(body));
};

CDaaS.prototype.fromAmountForEvent = function(req, res) {
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

exports.CDaaS = CDaaS;
