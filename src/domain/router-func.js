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
	} else */ if (name === "products") {
		require("./products/product-router-id")(router, service, req, res);
	} else {
		router.get("/:_id", (req, res) => {
			service.retrieveByQuery (
				{ "_id": req.params._id },
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
						res.json(docs);
					}
				},
				(err) => {
					res.status(500).json(docs);
				}
			);
			res.status(201).send(`Success! Your ${name.slice(0, -1)} has been entered.`);
		}
	});
	router.put("/:_id", (req, res) => {
		if (name === "orders") {
			let newOrder = GET.newOrder(GET, Class, req.body, req.params._id);
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
						res.json(docs);
					}
				}, (err) => {
					res.status(500).json(docs);
				}
			);
			res.status(201).send(`Success! Your ${name.slice(0, -1)} has been entered.`);
		}
	});
	router.delete("/:_id", (req, res) => {
		service.deleteById (
			req.params._id,
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