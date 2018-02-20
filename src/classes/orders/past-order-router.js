"use strict";
const DEBUG = require("debug")("gcapi:past-orders");
const ORDER_SERVICE = require("./past-order-service");
const service = new ORDER_SERVICE();
module.exports = (FORMAT, MOMENT) => {
	let pastOrders;
	let orders;
	let tables = {};
/* 	service.retrieveAll( (docs) => {
		if (docs.length === 0) {
			res.sendStatus(204);
		} else {
			
		}
	}, (err) => {
		res.status(500).json(docs);
	}); */

	const MongoClient = require("mongodb").MongoClient;
	MongoClient.connect("mongodb://localhost:27017/gcdb", (err, db) => {
		// throw ((err) ? err : "");
		let gcdbOrders = db.collection("orders").find();
		let gcdbProducts = db.collection("products").find();
		let gcdbCustomers = db.collection("customers").find();
		gcdbOrders.toArray((err, allOrders) => {
			orders = allOrders;
			pastOrders = allOrders;
			// DEBUG(pastOrders.items);
			gcdbProducts.toArray((err, allProducts) => {
				tables.products = allProducts;
				gcdbCustomers.toArray((err, allCustomers) => {
					tables.customers = allCustomers;
					let totals = {
						allTotal: 0,
						ordersTotal: []
					};
					for (let i in orders) {
						require("./ordercalculate")(FORMAT, MOMENT, orders[i], tables, totals);
						DEBUG(orders[i].orderTotal);
					}
					totals.allTotal = FORMAT.toDollar(totals.allTotal);
					// DEBUG(tables);
					// DEBUG(`\n\n`);
					DEBUG(pastOrders);
					return {
						"allTotal": totals.allTotal,
						"orderTotal": totals.ordersTotal,
						"pastOrders": pastOrders,
						"orders": orders
					};
				});
			});
		});
	});
};