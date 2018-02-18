"use strict";
const DEBUG = require("debug")("gcapi:order-calculate");
module.exports = (FORMAT, MOMENT, orders, tables, totals) => {
	let item = orders.items;
	let orderTotal = 0;
	for (let i in item) {
		item[i].orderTotal = 0;
		for (let j in tables.products) {
			if (item[i].itemId===tables.products[j]._id) {
				item[i].itemPrice = FORMAT.toNum(tables.products[j].price);
				item[i].orderTotal = FORMAT.toNum(item[i].itemPrice*item[i].qty);
				item[i].itemId = tables.products[j].name;
				tables.products[j].inventory.count -= item[i].qty;
			}
		}
		totals.allTotal += item[i].orderTotal;
		orderTotal += item[i].orderTotal;
		item[i].itemPrice = FORMAT.toDollar(item[i].itemPrice);
		item[i].orderTotal = FORMAT.toDollar(item[i].orderTotal);
	}
	orderTotal = FORMAT.toDollar(orderTotal);
	totals.ordersTotal.push(orderTotal);
	for (let i in tables.customers) {
		if (orders.customer===tables.customers[i].id) {
			orders.customer = tables.customers[i].name;
		}
	}
	let get = {
		date: orders.date,
		oldFormat: "M-DD-YYYYTHH:mm:ss:SSSZ",
		newFormat: "dddd, YYYY MMMM Do, hh:mm:ss a",
	};
	orders.date = MOMENT(get.date, get.oldFormat)
		.format(get.newFormat);
	return orderTotal;
};