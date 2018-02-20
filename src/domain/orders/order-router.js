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
					let orderTotal = FORMAT.toDollar(docs[i].orderTotal);
					let orderItems = [];
					let orderNum = [];
					for ( let j = 0; j < 5; j++ ) {
							orderItems.push(
								( docs[i].items[j] )
									? `Item #${docs[i].items[j].itemId}`
									: 'N/A'
							);
							orderNum.push(
								( docs[i].items[j] )
									? `/products/${docs[i].items[j].itemId}`
									: '/'
							);
						}
						let userNum = docs[i].userId;
						let customerNum = docs[i].customerId;
						let user = [ `/users/${userNum}`, `User #${userNum}` ];
						let customer = [ `/customers/${customerNum}`, `Customer #${customerNum}` ];
						let order1 = [ orderNum[0], orderItems[0] ];
						let order2 = [ orderNum[1], orderItems[1] ];
						let order3 = [ orderNum[2], orderItems[2] ];
						let order4 = [ orderNum[3], orderItems[3] ];
						let order5 = [ orderNum[4], orderItems[4] ];
						allTableRows += `
							<tr>
								<td>${docs[i].id}<td>
									<td><a href='${user[0]}'>${user[1]}</a><td>
									<td><a href='${customer[0]}'>${customer[1]}</a><td>
									<td>${date}<td>
									<td>${orderTotal}<td>
									<td><a href='${order1[0]}'>${order1[1]}</a><td>
									<td><a href='${order2[0]}'>${order2[1]}</a><td>
									<td><a href='${order3[0]}'>${order3[1]}</a><td>
									<td><a href='${order4[0]}'>${order4[1]}</a><td>
									<td><a href='${order5[0]}'>${order5[1]}</a><td>
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
