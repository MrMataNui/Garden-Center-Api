"use strict";
const DEBUG = require("debug")("gcapi:user:router");
const EXPRESS = require("express");
const router = EXPRESS.Router();
const USER_SERVICE = require("./user-service");
const service = new USER_SERVICE();
// const USER_SERVICE = require("../../auth/mw-authorization")(['ADMIN']);

module.exports = (req, res, next) => {
	require("../router-use")(router, DEBUG, req, res, next);
	router.get("/", (req, res) => {
	let userIndex;
	let index;
		service.retrieveByQuery({}, (docs) => {
			if (docs.length === 0) {
				// res.sendStatus(204);
			} else {
				let allTableRows = ``;
				for (let i in docs) {
					allTableRows += `
						<tr>
							<td>${docs[i].id}<td>
							<td>${docs[i].name}<td>
							<td>${docs[i].title}<td>
							<td>${docs[i].roles.join(', ')}<td>
							<td>${docs[i].email}<td>
						</tr>
					`;
				}
				let userHtml = require("../../view/users");
				userIndex = `${userHtml[0]}${allTableRows}${userHtml[1]}`;
			}
			res.end(userIndex);
		}, (err) => {
			res.status(500).json(docs);
		});
	});
	require("../router-func")("users", router, DEBUG, service, null);
	router.handle(req, res, next);
};