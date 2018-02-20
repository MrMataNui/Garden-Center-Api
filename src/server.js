"use strict";
const DEBUG = require("debug")("gcapi:server");
const parser = require("body-parser");
const express = require("express");
const authorization = require('express-authorization');
const FORMAT = require("./classes/format");
const MOMENT = require("moment");
const app = express();
app.use(parser.json());
app.use(parser.urlencoded({ extended : true }));

/* var chai = require('chai');
var expect = chai.expect; // we are using the "expect" style of Chai
var CartSummary = require('./../../src/part1/cart-summary');

describe('CartSummary', function() {
	it('getSubtotal() should return 0 if no items are passed in', function() {
		var cartSummary = new CartSummary([]);
		expect(cartSummary.getSubtotal()).to.equal(0);
	});
}); */
const users = require("./domain/users/user-router");
const orders = require("./domain/orders/order-router");
// const orders = require("./domain/orders/order-router-test");
const products = require("./domain/products/product-router");
const customers = require("./domain/customers/customer-router");
// const pastOrders = require("./classes/orders/past-order-router");
// DEBUG( pastOrders(FORMAT, MOMENT) );
// DEBUG(`${users}`);
let ip = '127.0.0.1';
let port = 8081;

app.listen(port, () => {
	DEBUG(`\n\nServer running at http://${ip}:${port}/`);
});
const index = require("./view/index");
app.get("/", (req, res) => {
	res.writeHead(200, {"Content-Type": "text/html"});
	res.end(index);
});
app.use('/users', users);
app.use('/orders', orders);
app.use('/products', products);
app.use('/customers', customers);