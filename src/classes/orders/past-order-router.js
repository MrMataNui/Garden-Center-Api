"use strict";
const DEBUG = require("debug")("gcapi:past-order-router");
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
		if (err) throw err;
		let gcdbOrders = db.collection("orders").find();
		let gcdbProducts = db.collection("products").find();
		let gcdbCustomers = db.collection("customers").find();
		let gcdbUsers = db.collection("users").find();
		gcdbOrders.toArray((err, allOrders) => {
			orders = allOrders;
			pastOrders = allOrders;
			// DEBUG(orders[0].orderTotal);
			if ( orders[0].orderTotal[0] != '$' && orders[0].orderTotal[-3] != '.') {
				// DEBUG(pastOrders.items);
				gcdbProducts.toArray((err, allProducts) => {
					tables.products = allProducts;
					gcdbUsers.toArray((err, allUsers) => {
						tables.users = allUsers;
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
							db.collection("orders").deleteMany({}, (err, obj) => {
								if (err) throw err;
								// console.log(obj.result.n + " document(s) deleted");
								db.close();
							});
							db.collection("orders").insertMany(orders, (err, res) => {
								if (err) throw err;
								// console.log("Number of documents inserted: " + res.insertedCount);
								db.close();
							});
							return {
								"allTotal": totals.allTotal,
								"orderTotal": totals.ordersTotal,
								"pastOrders": pastOrders,
								"orders": orders
							};
						});
					});
				});
			}
		});
	});
};