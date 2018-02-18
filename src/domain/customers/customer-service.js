"use strict";
const DEBUG = require("debug")("gcapi:customer:customer-service");
const AJV = require("ajv");
const ajv = new AJV();
const SCHEMA = require("./customer-schema");
const VALIDATE = ajv.compile(SCHEMA);
const MONGO_CLIENT = require("../../lib/mongo-client");

module.exports = class CustomerService {
	constructor() {
		this.mongo = new MONGO_CLIENT();
	}
	checkConnection() {
		this.mongo.checkConnection();
	}
	retrieveByQuery(query, onSuccess, onError) {
		this.mongo.query("customers", query, onSuccess, onError);
	}
	retrieveAll(onSuccess, onError) {
		this.mongo.query("customers", {}, onSuccess, onError);
	}
	insertByQuery(query, onSuccess, onError) {
		this.mongo.insert("customers", query, onSuccess, onError);
	}
	updateByQuery(query, onSuccess, onError) {
		this.mongo.update("customers", query, onSuccess, onError);
	}
	deleteById(id, onSuccess, onError) {
		this.mongo.delete("customers", id, onSuccess, onError);
	}
	deleteAll(onSuccess, onError) {
		this.mongo.delete("customers", {}, onSuccess, onError);
	}
};