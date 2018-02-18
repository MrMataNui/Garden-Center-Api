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
		"roles": {
			"type": "array",
			"items": { "type": "string" }
		},
		"password": {
			"type": "string"
		}
	},
	"required": [
		"name", "email", "roles", "password"
	]
};