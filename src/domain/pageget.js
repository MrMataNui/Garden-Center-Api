module.exports = (name, router, page, Class, GET) => {
	// ( `Error: "${errorMsg}."` == 'Error: "' + errorMsg + '."')
	router.get(`${page}`, (req, res) => {
		res.send(Class.getAll());
	});
	router.get(`${page}/:id`, (req, res) => {
		res.send(Class.getById(req.params.id));
	});
	router.post(`${page}`, (req, res) => {
		if (name === "orders") {
			let newOrder = GET.newOrder(GET, Class, req.body, false);
			if (newOrder === "Not enough products.") {
				let errorMsg = `${newOrder} Please order fewer items.`;
				res.status(400).send(`Error: "${errorMsg}"`);
			} else {
				Class.add(newOrder);
				res.status(201).send("Success! Your order has been entered.");
			}
		} else {
			Class.add(req.body);
			res.status(201).send(`Success! Your ${name.slice(0, -1)} has been entered.`);
		}
	});
	router.put(`${page}/:_id`, (req, res) => {
		if (page.indexOf("orders") >= 0) {
			let newOrder = GET.newOrder(GET, Class, req.body, req.params.id);
			if (newOrder === "Not Enough Products") {
				let errorMsg = `${newOrder}. Please order fewer items.`;
				res.status(400).send(`Error: "${errorMsg}"`);
			} else {
				Class.update(newOrder);
				res.status(201).send("Success! Your order has been entered.");
			}
		} else {
			Class.update(req.body);
			res.status(201).send(`Success! Your ${name.slice(0, -1)} has been entered.`);
		}
	});
	router.delete(`${page}/:id`, (req, res) => {
		Class.deleteById(req.params.id);
		res.status(201).send(`Success! Your ${name.slice(0, -1)} has been entered.`);
	});
};