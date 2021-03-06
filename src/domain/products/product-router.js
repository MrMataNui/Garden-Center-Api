"use strict";
const DEBUG = require("debug")("gcapi:product:router");
const FORMAT = require("../../classes/format");
const EXPRESS = require("express");
const router = EXPRESS.Router();
const PRODUCT_SERVICE = require("./product-service");
const service = new PRODUCT_SERVICE();
// const PRODUCT_SERVICE = require("../../auth/mw-authorization")(['ADMIN']);

module.exports = (req, res, next) => {
	require("../router-use")(router, DEBUG, req, res, next);
	router.get("/", (req, res) => {
		let productIndex;
		service.retrieveAll( (docs) => {
			if (docs.length === 0) {
				// res.sendStatus(204);
				productIndex = `${productHtml[0]}${productHtml[1]}`;
			} else {
				let allTableRows = ``;
				for (let i in docs) {
					// DEBUG(docs[i].inventory);
					let price = FORMAT.toDollar(docs[i].price);
					let productType = FORMAT.toSentance(docs[i].productType);
					allTableRows += `
						<tr>
							<td>${docs[i].id}<td>
							<td>${docs[i].sku}<td>
							<td>${docs[i].name}<td>
							<td>${productType}<td>
							<td>${docs[i].description}<td>
							<td>${docs[i].manufacturer}<td>
							<td>${price}<td>
							<td>${docs[i].inventory[0].count}<td>
							<td>${docs[i].inventory[0].location}<td>
							<td>${docs[i].inventory[0].aisle}<td>
							<td>${docs[i].inventory[0].bin}<td>
						</tr>
					`;
				}
				let productHtml = require("../../view/products");
				productIndex = ` ${productHtml[0]} ${allTableRows} ${productHtml[1]} `;
			}
			res.end(productIndex);
		}, (err) => {
			res.status(500).json(docs);
		});
	});
	require("../router-func")("products", router, DEBUG, service, req, res);
	router.handle(req, res, next);
};