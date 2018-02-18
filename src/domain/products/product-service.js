"use strict";
const DEBUG = require("debug")("gcapi:product:service");
const AJV = require("ajv");
const ajv = new AJV();
const SCHEMA = require("./product-schema");
const VALIDATE = ajv.compile(SCHEMA);
const MONGO_CLIENT = require("../../lib/mongo-client");

module.exports = class ProductService {
	constructor() {
		this.mongo = new MONGO_CLIENT();
	}
	checkConnection() {
		this.mongo.checkConnection();
	}
	retrieveByQuery(query, onSuccess, onError) {
		this.mongo.query("products", query, onSuccess, onError);
	}
	retrieveAll(onSuccess, onError) {
		this.mongo.query("products", {}, onSuccess, onError);
	}
	insertByQuery(query, onSuccess, onError) {
		this.mongo.insert("products", query, onSuccess, onError);
	}
	updateByQuery(query, onSuccess, onError) {
		this.mongo.update("products", query, onSuccess, onError);
	}
	deleteByQuery(query, onSuccess, onError) {
		this.mongo.delete("products", query, onSuccess, onError);
	}
	deleteAll(onSuccess, onError) {
		this.mongo.delete("products", {}, onSuccess, onError);
	}
};