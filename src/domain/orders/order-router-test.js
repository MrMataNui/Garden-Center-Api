"use strict";
const DEBUG = require("debug")("gcapi:order:router:test");
const EXPRESS = require("express");
const router = EXPRESS.Router();
const ORDER_SERVICE = require("./order-service");
const o_service = new ORDER_SERVICE();
const CUSTOMER_SERVICE = require("../customers/customer-service");
const c_service = new CUSTOMER_SERVICE();
const USER_SERVICE = require("../users/user-service");
const u_service = new USER_SERVICE();
const services = {
	order: o_service,
	customer: c_service,
	user: u_service
};
// const USER_SERVICE = require("../../auth/mw-authorization")(['ADMIN']);

let FORMAT = require("../../classes/format");
let MOMENT = require("moment");
// let PAST_ORD = require("../../classes/orders/pastorders")(FORMAT, MOMENT);
let NEW_ORD = require("../../classes/orders/neworders");
let GET = {
	// pastOrder:		PAST_ORD,
	newOrder:		NEW_ORD,
	format:			FORMAT,
	moment:			MOMENT
};

module.exports = (req, res, next) => {
	require("../router-use")(router, DEBUG, req, res, next);
	router.get("/", (req, res) => {
		let orderIndex;
		let index;
			o_service.retrieveByQuery({}, (docs) => {
				if (docs.length === 0) {
					res.sendStatus(204);
				} else {
					let allTableRows = ``;
					for (let i in docs) {
						// DEBUG(docs[i].inventory);
						c_service.retrieveByQuery(
							{"id": docs[i].customerId},
							(c_docs) => {
								if (c_docs.length === 0) {
									res.sendStatus(204);
								} else {
									let customerName = c_docs[0].name;
									// DEBUG(customerName);
									u_service.retrieveByQuery(
										{"id": docs[i].userId},
										(u_docs) => {
											if (u_docs.length === 0) {
												res.sendStatus(204);
											} else {
												let userName = u_docs[0].name;
												// DEBUG(userName);
												let date = FORMAT.toDate(docs[i].date);
												let orderTotal = FORMAT.toDollar(docs[i].orderTotal);
												allTableRows += `
													<tr>
														<td>${docs[i].id}<td>
														<td>${docs[i].userId}
															${userName}<td>
														<td>${docs[i].customerId}
															${customerName}<td>
														<td>${date}<td>
														<td>${orderTotal}<td>
													</tr>
												`;
												let orderHtml = require("../../view/orders");
												orderIndex = `
													${orderHtml[0]}
													${allTableRows}
													${orderHtml[1]}`;
											}
											res.end(orderIndex);
										}, (err) => {
											res.status(500).json(docs);
										}
									);
								}
							}, (err) => {
								res.status(500).json(docs);
							}
						);
					}
				}
			}, (err) => {
				res.status(500).json(docs);
			});
	});
	require("../router-func")("orders", router, DEBUG, o_service, req, res, GET, services);
	router.handle(req, res, next);
};
// require("../pageget")("orders", router, "/", ORDERS, GET);
