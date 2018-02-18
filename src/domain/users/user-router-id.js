const DEBUG = require("debug")("gcapi:user:router:id");
module.exports = (router, service, req, res) => {
	router.get("/:id", (req, res) => {
	let userIndex = ``;
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
							<td>${docs[i].name}<td>
							<td>${docs[i].title}<td>
							<td>${docs[i].roles.join(', ')}<td>
							<td>${docs[i].email}<td>
						</tr>
					`;
				}
				let userHtml = require("../../view/users");
				userIndex = `
					${userHtml[0]}
					${allTableRows}
					${userHtml[1]}
				`;
				res.end(userIndex);
			}
		}, (err) => {
			res.status(500).json(docs);
		});
	});
};