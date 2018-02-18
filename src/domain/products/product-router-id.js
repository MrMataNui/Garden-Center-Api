const DEBUG = require("debug")("gcapi:product:router:id");
module.exports = (router, service, req, res) => {
	router.get("/:id", (req, res) => {
	let productIndex = ``;
		service.retrieveByQuery( {"id": req.params.id}, (docs) => {
			if (docs.length === 0) {
				// res.sendStatus(204);
			} else {
				let allTableRows = ``;
				for (let i in docs) {
					// DEBUG(docs[i].inventory);
					allTableRows += `
						<tr>
							<td>${docs[i].id}<td>
							<td>${docs[i].sku}<td>
							<td>${docs[i].name}<td>
							<td>${docs[i].productType}<td>
							<td>${docs[i].description}<td>
							<td>${docs[i].manufacturer}<td>
							<td>${docs[i].price}<td>
							<td>${docs[i].inventory[0].count}<td>
							<td>${docs[i].inventory[0].location}<td>
							<td>${docs[i].inventory[0].aisle}<td>
							<td>${docs[i].inventory[0].bin}<td>
						</tr>
					`;
				}
				let productHtml = require("../../view/products");
				productIndex = `
					${productHtml[0]}
					${allTableRows}
					${productHtml[1]}
				`;
				res.end(productIndex);
			}
		}, (err) => {
			res.status(500).json(docs);
		});
	});
};