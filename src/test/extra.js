function getData(){
	return new promise((resolve, reject) => {
		var dataArray = [];
		getCollection1().then((rows1) => {
			getCollection2().then((rows2) => {
				var val = someDataProcessingFunction(rows1, rows2);
				dataArray.push(val);
				resolve(dataArray);
			}, (err) => {
				reject(err);
			});
		}, (err) => {
			reject(err);
		});
		getCollection3().then((rows3) => {
			rows3.forEach((row3) => {
				dataArray.push(row3);
			});
			resolve(dataArray);
		}, (err) => {
			reject(err);
		});
	});
}
function getData(){
	return Promise.all([
		getCollection1(),
		getCollection2(),
		getCollection3()
	]).then(([rows1, rows2, rows3]) => {
		return [someDataProcessingFunction(rows1, rows2)].concat(rows3);
	});
}
let orderQuery = o_service.retrieveByQuery();
let customerQuery = c_service.retrieveByQuery();
let userQuery = u_service.retrieveByQuery();
function getData(){
	return Promise.all([
		orderQuery(),
		customerQuery(),
		userQuery()
	]).then(([rows1, rows2, rows3]) => {
		return [someDataProcessingFunction(rows1, rows2)].concat(rows3);
	});
}
o_service.retrieveByQuery(
	{}, 
	getOrders, 
	onError
);
function onError (err, docs) {
	res.status(500).json(docs);
}
function getOrders (o_docs) {
	if (o_docs.length === 0) {
		res.sendStatus(204);
	} else {
		let allTableRows = ``;
		for (let i in o_docs) {
			// DEBUG(o_docs[i].inventory);
			c_service.retrieveByQuery(
				{"_id": o_docs[i].customerId},
				getCustomers,
				onError
			);
		}
	}
}
function getCustomers (c_docs) {
	if (c_docs.length === 0) {
		res.sendStatus(204);
	} else {
		DEBUG(`c_docs`);
		DEBUG(c_docs);
		DEBUG(i);
		DEBUG(`o_docs[i], ${o_docs[i]}`);
		let customerName = c_docs[0].name;
		DEBUG(customerName);
		u_service.retrieveByQuery(
			{"_id": o_docs[i].userId},
			getUsers.bind(
				{
					i: i,
					o_docs: o_docs,
					customerName: customerName
				}
			),
			onError
		);
	}
}
function getUsers (u_docs, i, o_docs, customerName) {
	if (u_docs.length === 0) {
		res.sendStatus(204);
	} else {
		let userName = u_docs.name;
		DEBUG(userName);
		let date = FORMAT.toDate(o_docs[i].date);
		let orderTotal = FORMAT.toDollar(o_docs[i].orderTotal);
		allTableRows += `
			<tr>
				<td>${o_docs[i]._id}<td>
				<td>${o_docs[i].userId}
					${userName}<td>
				<td>${o_docs[i].customerId}
					${customerName}<td>
				<td>${date}<td>
				<td>${orderTotal}<td>
			</tr>
		`;
		let orderHtml = require("../../view/orders");
		orderIndex = `
			${orderHtml[0]}
			${allTableRows}
			${orderHtml[1]}`;
	}
	res.end(orderIndex);
}
