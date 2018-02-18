"use strict";
const DEBUG = require("debug")("gcapi:past-orders");
module.exports = (FORMAT, MOMENT) => {
	let pastOrders;
	let orders;
	let tables = {};
	const MongoClient = require("mongodb").MongoClient;
	MongoClient.connect("mongodb://localhost:27017/", (err, client) => {
		throw ((err) ? err : "");
		let gcdb = client.db("gcdb");
		let gcdbOrders = gcdb.collection("orders").find();
		let gcdbProducts = gcdb.collection("products").find();
		let gcdbCustomers = gcdb.collection("customers").find();
		gcdbOrders.toArray((err, allOrders) => {
			orders = allOrders;
			pastOrders = allOrders;
			// DEBUG(pastOrders.items);
			gcdbProducts.toArray((err, allProducts) => {
				tables.products = allProducts;
				gcdbCustomers.toArray((err, allCustomers) => {
					tables.customers = allCustomers;
					// DEBUG(tables);
					let totals = {
						allTotal: 0,
						ordersTotal: []
					};
					for (let i in orders) {
						orders[i].orderTotal = require("./ordercalculate")(FORMAT, MOMENT, orders[i], tables, totals);
					}
					totals.allTotal = FORMAT.toDollar(totals.allTotal);
					DEBUG(totals.allTotal);
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