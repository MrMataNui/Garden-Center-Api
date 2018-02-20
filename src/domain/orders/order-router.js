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
			o_service.retrieveAll( (docs) => {
				if (docs.length === 0) {
					res.sendStatus(204);
					orderIndex = `${orderHtml[0]}${orderHtml[1]}`;
				} else {
					let allTableRows = ``;
					for (let i in docs) {
						// DEBUG(docs[i].inventory);
					let date = FORMAT.toDate(docs[i].date);
					// let orderTotal = FORMAT.toDollar(docs[i].orderTotal);
					let orderItems = [];
					let orderNum = [];
					for ( let j = 0; j < 5; j++ ) {
							orderItems.push(
								( docs[i].items[j] )
									? `${docs[i].items[j].itemId}`
									: '--'
							);
							orderNum.push(
								( docs[i].items[j] )
									? `${docs[i].items[j].qty}`
									: '--'
							);
						}
						let order1 = [ orderItems[0], orderNum[0] ];
						let order2 = [ orderItems[1], orderNum[1] ];
						let order3 = [ orderItems[2], orderNum[2] ];
						let order4 = [ orderItems[3], orderNum[3] ];
						let order5 = [ orderItems[4], orderNum[4] ];
						allTableRows += `
							<tr>
								<td>${docs[i].id}<td>
									<td>${docs[i].userId}<td>
									<td>${docs[i].customerId}<td>
									<td>${docs[i].date}<td>
									<td>${docs[i].orderTotal}<td>
									<td>${order1[0]}<td>
									<td>${order1[1]}<td>
									
									<td>${order2[0]}<td>
									<td>${order2[1]}<td>
									
									<td>${order3[0]}<td>
									<td>${order3[1]}<td>
									
									<td>${order4[0]}<td>
									<td>${order4[1]}<td>
									
									<td>${order5[0]}<td>
									<td>${order5[1]}<td>
								</tr>
						`;
					}
					let orderHtml = require("../../view/orders");
					orderIndex = ` ${orderHtml[0]} ${allTableRows} ${orderHtml[1]}`;
				}
				res.end(orderIndex);
			}, (err) => {
				res.status(500).json(docs);
			});
	});
	require("../router-func")("orders", router, DEBUG, o_service, req, res, GET/* , services */);
	router.handle(req, res, next);
};
// require("../pageget")("orders", router, "/", ORDERS, GET);
