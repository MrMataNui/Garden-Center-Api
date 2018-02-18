module.exports = {
	"type": "object",
	"properties": {
		"_id": {
			"type": "string"
		},
		"sku": {
			"type": "number"
		},
		"productType": {
			"type": "string"
		},
		"name": {
			"type": "string"
		},
		"description": {
			"type": "string"
		},
		"manufacturer": {
			"type": "string"
		},
		"price": {
			"type": "number"
		},
		"inventory": {
			"type": "object",
			"properties": {
				"count":		{ "type": "number" },
				"location":	{ "type": "string" },
				"aisle":		{ "type": "string" },
				"bin":			{ "type": "number" }
			}
		}
	},
	"required": [
		"sku", "productType", "name", "description", "manufacturer", "price", "inventory"
	]
};