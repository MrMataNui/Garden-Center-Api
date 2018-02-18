let header = [`
	<header>
		<title>Garden Center API</title>
		<style>${require("./main-css")}</style>
	</header>
`];
let aside = [`
	<aside>
		<ul>
			<li><a href='/'>Home<\a></li>
			<li><a href='/users'>Users<\a></li>
			<li><a href='/orders'>Orders<\a></li>
			<li><a href='/products'>Products<\a></li>
			<li><a href='/customers'>Customers<\a></li>
		</ul>
	</aside>
`];
module.exports =  {
	"header": `<!DOCTYPE html> <html> ${header} <body> ${aside} <main>`,
	"footer": `</main> </body> </html>`
	};