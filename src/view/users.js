let html = require("./headers");
let tableHeader = [`
	<tr>
		<td>ID<td>
		<td>Name<td>
		<td>Title<td>
		<td>Roles<td>
		<td>Email<td>
	</tr>
`];
module.exports =   [`
	${html.header}
		<h1>Users</h1>
		<table>
			${tableHeader}
			`], [`
		</table>
	${html.footer}
`];