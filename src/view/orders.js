const html = require("./headers");
const tableHeader = [`
	<tr>
		<td>ID<td>
		<td>User<td>
		<td>Customer<td>
		<td>Date<td>
		<td>Order total<td>
		<td>Item 1<td>
		<td>Item 2<td>
		<td>Item 3<td>
		<td>Item 4<td>
		<td>Item 5<td>
	</tr>
`];
module.exports =   [`
	${html.header}
		<h1>Orders</h1>
		<table>
			${tableHeader}
			`], [`
		</table>
	${html.footer}
`];