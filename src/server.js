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

const users = require("./domain/users/user-router");
const orders = require("./domain/orders/order-router");
// const orders = require("./domain/orders/order-router-test");
const products = require("./domain/products/product-router");
const customers = require("./domain/customers/customer-router");

require("./classes/orders/past-order-router")(FORMAT, MOMENT);
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