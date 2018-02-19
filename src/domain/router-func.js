module.exports = (name, router, DEBUG, service, req, res, GET, services) => {
/* 	router.get("/", (req, res) => {
		service.retrieveByQuery(
			{},
			(docs) => {
				if (docs.length === 0) {
					res.sendStatus(204);
				} else {
					res.json(docs);
				}
			}, (err) => {
				res.status(500).json(docs);
			}
		);
	}); */
	/* if (name === "orders") {
		require("./orders/order-router-id")(router, services, GET, req, res);
	} else */ 
	if (name === "products") {
		require("./products/product-router-id")(router, service, req, res);
	} else if (name === "users") {
		require("./users/user-router-id")(router, service, req, res);
	} else if (name === "customers") {
		require("./customers/customer-router-id")(router, service, req, res);
	} else {
		router.get("/:id", (req, res) => {
			service.retrieveByQuery (
				{ "id": req.params.id },
				(docs) => {
					if (docs.length === 0) {
						res.sendStatus(204);
					} else {
						res.json(docs);
					}
				},
				(err) => {
					res.status(500).json(docs);
				}
			);
		});
	}
	router.post("/", (req, res) => {
		if (name === "orders") {
		} else {
			service.insertByQuery (
				req.body,
				(docs) => {
					if (docs.length === 0) {
						res.sendStatus(204);
					} else {
						res.end(`success`);
					}
				},
				(err) => {
					res.status(500).json(docs);
				}
			);
			res.status(201).send(`Success! Your ${name.slice(0, -1)} has been entered.`);
		}
	});
	router.put("/:id", (req, res) => {
		if (name === "orders") {
			let newOrder = GET.newOrder(GET, Class, req.body, req.params.id);
			if (newOrder === "Not Enough Products") {
				let errorMsg = `${newOrder}. Please order fewer items.`;
				res.status(400).send(`Error: "${errorMsg}"`);
			} else {
				service.updateByQuery (
					newOrder,
					(docs) => {
						if (docs.length === 0) {
							res.sendStatus(204);
						} else {
							res.json(docs);
						}
					},
					(err) => {
						res.status(500).json(docs);
					}
				);
				res.status(201).send("Success! Your order has been entered.");
			}
		} else {
			service.updateByQuery (
				req.body,
				(docs) => {
					if (docs.length === 0) {
						res.sendStatus(204);
					} else {
						res.end(`success`);
					}
				}, (err) => {
					res.status(500).json(docs);
				}
			);
			res.status(201).send(`Success! Your ${name.slice(0, -1)} has been entered.`);
		}
	});
	router.delete("/:id", (req, res) => {
		service.deleteById (
			req.params.id,
			(docs) => {
				if (docs.length === 0) {
					res.sendStatus(204);
				} else {
					res.json(docs);
				}
			}, (err) => {
				res.status(500).json(docs);
			}
		);
		res.status(201).send(`Success! Your ${name.slice(0, -1)} has been entered.`);
	});
};