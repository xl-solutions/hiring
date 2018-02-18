class ResponseMock {
	constructor(callback) {
		this.callback = callback;
		this.body = {};
		this.respStatus = 200;
		this.bodyMessage = '';
		this.respHeader = [];
	}
	json(jsonData) {
		this.body = jsonData;
		this.respStatus = 200;
		return this.callback();
	}
	send(bodyMessage) {
		this.bodyMessage = bodyMessage;
		return this.callback();
	}
	status(code) {
		this.respStatus = code;
		return this;
	}
	header(headerKey, headerData) {
		this.respHeader[headerKey] = headerData;
	}
  }
  module.exports = ResponseMock;