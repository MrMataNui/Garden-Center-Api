module.exports = `
main {
	font-family: 'Ubuntu Mono', serif;
	margin: auto;
	border: double black;
	background-color: #fff;
	border-radius: 10px;
	margin: auto;
	padding-bottom: 1.5em;
}
aside {
	font-family: 'Cinzel', serif;
	font-weight: bold;
	margin: 20px .5em 0;
	border-radius: .5em;
	padding-left: .5em;
	padding-right: 2em;
	background-color: skyblue;
	border: 1px solid black;
	float: left;
	width: 10%;
	text-align: left;
}
aside ul {
	list-style-type: none;
	margin-right: auto;
	padding-left: 0;
	margin: 0 auto;
	padding-right: 2em;
}
aside ul li {
	width: 150%;
}
h1 {
	font-family: 'Cinzel', serif;
	background-color: skyblue;
	margin: 0;
	border-radius: 5px 5px 0 0;
}
h1, h2, h3, tr td {
	text-align: center;
}
a:link {
	text-decoration: none;
}
table {
	border: 1px solid black;
	border-radius: 10px;
	width: 85%;
	/* float: right; */
}
td {
	border: 1px solid black;
}
td:nth-of-type(even) {
	width: 0em;
}
tr:nth-of-type(1) {
	background-color: yellow;
	font-weight: bold;
}
`;