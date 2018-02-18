const DEBUG = require("debug")("gcapi:order:router:id");
module.exports = (router, services, GET, req, res) => {
	// DEBUG(services);
	const o_service = services.order;
	const c_service = services.customer;
	const u_service = services.user;
	router.get("/:_id", (req, res) => {
		let orderIndex;
		let index;
		o_service.retrieveByQuery({"_id": req.params._id}, (o_docs) => {
			if (o_docs.length === 0) {
				res.sendStatus(204);
				// res.end(`<h1>Error</h1>`);
			} else {
				let allTableRows = ``;
				// DEBUG(o_docs[0].inventory);
				c_service.retrieveByQuery({"_id": o_docs[0].customerId}, (c_docs) => {
					if (c_docs.length === 0) {
						res.sendStatus(204);
					} else {
						let customerName = c_docs[0].name;
						// DEBUG(customerName);
						u_service.retrieveByQuery({"_id": o_docs[0].userId}, (u_docs) => {
							if (u_docs.length === 0) {
								res.sendStatus(204);
							} else {
								let userName = u_docs[0].name;
								let date = GET.format.toDate(o_docs[0].date);
								let orderTotal = GET.format.toDollar(o_docs[0].orderTotal);
								let orderItems = [];
								let orderNum = [];
								for ( let i = 0; i < 5; i++ ) {
									orderItems.push(
										( o_docs[0].items[i] )
											? `Item<br>#${o_docs[0].items[i].itemId}`
											: 'N/A'
									);
									orderNum.push(
										( o_docs[0].items[i] )
											? `/products/${o_docs[0].items[i].itemId}`
											: '/'
									);
								}
								let order1 = [ orderNum[0], orderItems[0] ];
								let order2 = [ orderNum[1], orderItems[1] ];
								let order3 = [ orderNum[2], orderItems[2] ];
								let order4 = [ orderNum[3], orderItems[3] ];
								let order5 = [ orderNum[4], orderItems[4] ];
								allTableRows += `
									<tr>
										<td>${o_docs[0]._id}<td>
										<td>${userName}<td>
										<td>${customerName}<td>
										<td>${date}<td>
										<td>${orderTotal}<td>
										<td><a href='${order1[0]}'>${order1[1]}</a><td>
										<td><a href='${order2[0]}'>${order2[1]}</a><td>
										<td><a href='${order3[0]}'>${order3[1]}</a><td>
										<td><a href='${order4[0]}'>${order4[1]}</a><td>
										<td><a href='${order5[0]}'>${order5[1]}</a><td>
									</tr>
								`;
								let orderHtml = require("../../view/orders");
								orderIndex = `
									${orderHtml[0]}
									${allTableRows}
									${orderHtml[1]}`;
							}
							res.end(orderIndex);
						}, (err) => {
							res.status(500).json(o_docs);
						});
					}
				}, (err) => {
					res.status(500).json(o_docs);
				});
			}
		}, (err) => {
			res.status(500).json(o_docs);
		});
	});
};
