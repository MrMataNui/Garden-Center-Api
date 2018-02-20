"use strict";
const DEBUG = require("debug")("gcapi:order-calculate");
module.exports = (FORMAT, MOMENT, orders, tables, totals) => {
	let item = orders.items;
	let orderTotal = 0;
	for (let i in item) {
		item[i].itemTotal = 0;
		for (let j in tables.products) {
			if (item[i].itemId===tables.products[j].id) {
				item[i].itemPrice = FORMAT.toNum( tables.products[j].price );
				item[i].itemTotal = FORMAT.toNum( item[i].itemPrice*item[i].qty);
				DEBUG(`itemPrice ${item[i].itemPrice}`);
				DEBUG(`qty ${item[i].qty}`);
				DEBUG(`itemTotal ${item[i].itemTotal}`);
				item[i].itemId = tables.products[j].name;
				tables.products[j].inventory.count -= item[i].qty;
			}
		}
		totals.allTotal += parseFloat(item[i].itemTotal);
		orderTotal += parseFloat(item[i].itemTotal);
		item[i].itemPrice = FORMAT.toDollar(item[i].itemPrice);
		item[i].itemTotal = FORMAT.toDollar(item[i].itemTotal);
	}
	orderTotal = FORMAT.toDollar( orderTotal.toFixed(2) );
	totals.ordersTotal.push(orderTotal);
	for (let i in tables.customers) {
		if (orders.customerId == tables.customers[i].id) {
			orders.customerId = tables.customers[i].name;
		}
	}
	for (let i in tables.users) {
		if (orders.userId == tables.users[i].id) {
			orders.userId = tables.users[i].name;
		}
	}
	orders.date = FORMAT.toDate(orders.date);
	orders.orderTotal = orderTotal;
	DEBUG(`orders ${orders.orderTotal}`);
};