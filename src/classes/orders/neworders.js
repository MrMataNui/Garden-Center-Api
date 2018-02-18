"use strict";
const DEBUG = require("debug")("gcapi:new-orders");
module.exports = (GET, Orders, newOrder, orderId) => {
	const INV = GET.inv_ser;
	let tables = {
		products: INV.products,
		customers: INV.customers
	};
	let totals = {
		allTotal: 0,
		ordersTotal: []
	};
	if (orderId) {}
	let order = newOrder.order;
	let orderItem = [];
	let notEnough = false;
	for (let item in order) {
		let prodId = order[item].item;
		orderItem.push({
			"itemCount": tables.products[prodId].inventory.count,
			"orderQty": order[item].qty
		});
	}
	for (let item in orderItem) {
		let itemCount = orderItem[item].itemCount;
		let orderQty = orderItem[item].orderQty;
		if ((itemCount-orderQty) <= 0) {
			notEnough = true;
		}
	}
	if (notEnough) {
		return "Not enough products.";
	} else {
		newOrder.total = require("./ordercalculate")(GET.format, GET.moment, newOrder, tables, totals);
		return newOrder;
	}
};