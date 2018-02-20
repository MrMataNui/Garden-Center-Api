const html = require("./headers");
const tableHeader = [`
	<tr>
		<td>ID<td>
		<td>Sku<td>
		<td>Name<td>
		<td>Product Type<td>
		<td>Description<td>
		<td>Manufacturer<td>
		<td>Price<td>
		<td>Count<td>
		<td>Location<td>
		<td>Aisle<td>
		<td>Bin<td>
	</tr>
`];
module.exports =   [`
	${html.header}
		<h1>Products</h1>
		<table>
			${tableHeader}
			`], [`
		</table>
	${html.footer}
`];