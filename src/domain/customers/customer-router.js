"use strict";
const DEBUG = require("debug")("gcapi:customer:router");
const EXPRESS = require("express");
const router = EXPRESS.Router();
const CUSTOMER_SERVICE = require("./customer-service");
const service = new CUSTOMER_SERVICE();
// const CUSTOMER_SERVICE = require("../../auth/mw-authorization")(['ADMIN']);

module.exports = (req, res, next) => {
	require("../router-use")(router, DEBUG, req, res, next);
	router.get("/", (req, res) => {
		let customerIndex;
		let index;
			service.retrieveAll( (docs) => {
				if (docs.length === 0) {
					res.sendStatus(204);
					customerIndex = `${customerHtml[0]}${customerHtml[1]}`;
				} else {
					let allTableRows = ``;
					for (let i in docs) {
						allTableRows += `
							<tr>
								<td>${docs[i].id}<td>
								<td>${docs[i].name}<td>
								<td>${docs[i].email}<td>
								<td>${docs[i].address.street}<td>
								<td>${docs[i].address.city}<td>
								<td>${docs[i].address.state}<td>
								<td>${docs[i].address.zip}<td>
							</tr>
						`;
					}
					let customerHtml = require("../../view/customers");
					customerIndex = `${customerHtml[0]}${allTableRows}${customerHtml[1]}`;
				}
				res.end(customerIndex);
			}, (err) => {
				res.status(500).json(docs);
			});
	});
	require("../router-func")("customers", router, DEBUG, service, req, res);
	router.handle(req, res, next);
};