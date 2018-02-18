let html = require("./headers");
let tableHeader = [`
	<tr>
		<td>ID<td>
		<td>Name<td>
		<td>Email<td>
		<td>Street address<td>
		<td>City<td>
		<td>State<td>
		<td>Zip<td>
	</tr>
`];
module.exports =   [`
	${html.header}
		<h1>Customers</h1>
		<table>
			${tableHeader}
			`], [`
		</table>
	${html.footer}
`];