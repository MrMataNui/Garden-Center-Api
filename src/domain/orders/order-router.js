"use strict";
const DEBUG = require("debug")("gcapi:order:router");
const EXPRESS = require("express");
const router = EXPRESS.Router();
const ORDER_SERVICE = require("./order-service");
const o_service = new ORDER_SERVICE();
const CUSTOMER_SERVICE = require("../customers/customer-service");
const c_service = new CUSTOMER_SERVICE();
const USER_SERVICE = require("../users/user-service");
const u_service = new USER_SERVICE();
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
		res.writeHead(200, {"Content-Type": "text/html"});
		let orderIndex;
		let index;
			o_service.retrieveByQuery({}, (docs) => {
				if (docs.length === 0) {
					res.sendStatus(204);
				} else {
					let allTableRows = ``;
					for (let i in docs) {
						// DEBUG(docs[i].inventory);
					let date = FORMAT.toDate(docs[i].date);
					let orderTotal = FORMAT.toDollar(docs[i].orderTotal);
						allTableRows += `
							<tr>
								<td>${docs[i]._id}<td>
								<td>${docs[i].userId}<td>
								<td>${docs[i].customerId}<td>
								<td>${date}<td>
								<td>${orderTotal}<td>
							</tr>
						`;
					}
					let orderHtml = require("../../view/orders");
					orderIndex = `
						${orderHtml[0]}
						${allTableRows}
						${orderHtml[1]}`;
				}
				res.end(orderIndex);
			}, (err) => {
				res.status(500).json(docs);
			});
	});
	require("../router-func")("orders", router, DEBUG, o_service, GET, services, req, res);
	router.handle(req, res, next);
};
// require("../pageget")("orders", router, "/", ORDERS, GET);
