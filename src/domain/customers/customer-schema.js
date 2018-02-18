module.exports = {
	"type": "object",
	"properties": {
		"_id": {
			"type": "string"
		},
		"name": {
			"type": "string"
		},
		"email": {
			"type": "string"
		},
		"address": {
			"type": "object",
			"properties": {
				"street":	{ "type": "string" },
				"city":	{ "type": "string" },
				"state":	{ "type": "string" },
				"zip":		{ "type": "string" }
			}
		}
	},
	"required": [
		"name", "email", "address"
	]
};