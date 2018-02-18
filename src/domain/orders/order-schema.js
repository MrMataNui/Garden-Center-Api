module.exports = {
	"type": "object",
	"properties": {
		"id": {
			"type": "string"
		},
		"userId": {
			"type": "string"
		},
		"customerId": {
			"type": "string"
		},
		"date": {
			"type": "string",
			"format": "date-time"
		},
		"orderTotal": {
			"type": "number"
		},
		"items": {
			"type": "array",
			"properties": {
				"itemId":		{ "type": "string" },
				"qty":				{ "type": "number" },
				"itemPrice":	{ "type": "number" },
				"itemTotal":	{ "type": "number" }
			}
		}
	},
	"required": [
		"userId", "customerId", "date", "orderTotal", "items"
	]
};