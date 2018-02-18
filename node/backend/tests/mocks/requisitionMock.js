class RequisitionMock {
	constructor() {
		this.body = {};
		this.query = {};
		this.params = {};
		this.headers = [];
	}
	setBodyParams(body) {
		this.body = body;
	}
	setQueryParams(query) {
		this.query = query;
	}
	setPathParams(params) {
		this.params = params;
	}
	setHeaders(field, value) {
		this.headers[field] = value;
	}
	get(headersField) {
		return this.headers[headersField];
	}
  }
  module.exports = RequisitionMock;
  