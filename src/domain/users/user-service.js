"use strict";
const DEBUG = require("debug")("gcapi:user:user-service");
const AJV = require("ajv");
const ajv = new AJV();
const SCHEMA = require("./user-schema");
const VALIDATE = ajv.compile(SCHEMA);
const MONGO_CLIENT = require("../../lib/mongo-client");

module.exports = class UserService {
	constructor() {
		this.mongo = new MONGO_CLIENT();
	}
	checkConnection() {
		this.mongo.checkConnection();
	}
	retrieveByQuery(query, onSuccess, onError) {
		this.mongo.query("users", query, onSuccess, onError);
	}
	retrieveAll(onSuccess, onError) {
		this.mongo.query("users", {}, onSuccess, onError);
	}
	insertByQuery(query, onSuccess, onError) {
		this.mongo.insert("users", query, onSuccess, onError);
	}
	updateByQuery(query, onSuccess, onError) {
		this.mongo.update("users", query, onSuccess, onError);
	}
	deleteByQuery(query, onSuccess, onError) {
		this.mongo.delete("users", query, onSuccess, onError);
	}
	deleteAll(onSuccess, onError) {
		this.mongo.delete("users", {}, onSuccess, onError);
	}
};