"use strict";
const DEBUG = require("debug")("gcapi:order:order-service");
const AJV = require("ajv");
const ajv = new AJV();
const SCHEMA = require("./order-schema");
const VALIDATE = ajv.compile(SCHEMA);
const MONGO_CLIENT = require("../../lib/mongo-client");

module.exports = class OrderService {
	constructor() {
		this.mongo = new MONGO_CLIENT();
	}
	checkConnection() {
		this.mongo.checkConnection();
	}
	retrieveByQuery(query, onSuccess, onError) {
		this.mongo.query("orders", query, onSuccess, onError);
	}
	retrieveAll(onSuccess, onError) {
		this.mongo.query("orders", {}, onSuccess, onError);
	}
	insertByQuery(query, onSuccess, onError) {
		this.mongo.insert("orders", query, onSuccess, onError);
	}
	updateByQuery(query, onSuccess, onError) {
		this.mongo.update("orders", query, onSuccess, onError);
	}
	deleteByQuery(query, onSuccess, onError) {
		this.mongo.delete("orders", query, onSuccess, onError);
	}
	deleteAll(onSuccess, onError) {
		this.mongo.delete("orders", {}, onSuccess, onError);
	}
};