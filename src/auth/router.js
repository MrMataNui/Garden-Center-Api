"use strict";
module.exports = (app) => {
	const express = require("express");
	const MongoClient = require("mongodb").MongoClient;
	const router = express.Router();
	const logger = require("logger");
	MongoClient.connect("mongodb://localhost:27017/", (err, client) => {
		if (err) {throw err;}
		let gcdb = client.db("gcdb");
		let gcdbUsers = gcdb.collection("orders");
		gcdbUsers.find().toArray((err, allOrders) => {
			if (err) {throw err;}
			/**
			 * This middleware function logs all requests before
			 * passing the request to the appropriate handler
			 */
			router.use((req, res, next) => {
				console.log(`Time: ${Date.now()}, Request: ${req}`);
				next();
			});
			/**
			 * This middleware function
			 * validates the json object being passed
			 */
			router.use((req, res, next) => {
				((json)
					? next()
					: res.status(400)
						.send(`Bad Request, malformed JSON: ${req.body}`)
				);
			});
			// Express.js Methods (Route Handlers)...
			router.get("/users", (req, res) => {
				res.send(require("../classes/users").getAll());
			});
			router.get("/:id", (req, res) => {
				res.send(gcdb_users.getById(req.params.id));
			});
			router.post("/", (req, res, next) => {
				let result = UserService.validateObject(req.body);
				if (result.isValid) {
					next();
				} else {
					res.status(400).json({
						error: "Bad Request, malformed JSON",
						message: result.errors
					});
				}
			});
		});
	});
};