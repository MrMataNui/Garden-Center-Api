const DEBUG = require("debug")("gcapi:customer:router:id");
module.exports = (router, service, req, res) => {
	router.get("/:_id", (req, res) => {
	let customerIndex = ``;
		service.retrieveByQuery( {"_id": req.params._id}, (docs) => {
			if (docs.length === 0) {
				// res.sendStatus(204);
			} else {
				let allTableRows = ``;
				for (let i in docs) {
					// DEBUG(docs[i].inventory);
					allTableRows += `
							<tr>
								<td>${docs[i]._id}<td>
								<td>${docs[i].name}<td>
								<td>${docs[i].email}<td>
								<td>${docs[i].address.street}<td>
								<td>${docs[i].address.city}<td>
								<td>${docs[i].address.state}<td>
								<td>${docs[i].address.zip}<td>
							</tr>
					`;
				}
				let customerHtml = require("../../view/customers");
				customerIndex = `
					${customerHtml[0]}
					${allTableRows}
					${customerHtml[1]}
				`;
				res.end(customerIndex);
			}
		}, (err) => {
			res.status(500).json(docs);
		});
	});
};