module.exports = {
	"env": {
		"browser": true,			// browser global variables.
		"node": false,				// Node.js global variables and Node.js-specific rules.
		"worker": false,			// web workers global variables.
		"amd": false,				// defines require() and define() as global variables as per the amd spec.
		"mocha": false,			// adds all of the Mocha testing global variables.
		"jasmine": false,			// adds all of the Jasmine testing global variables for version 1.3 and 2.0.
		"phantomjs": false,		// phantomjs global variables.
		"jquery": false,			// jquery global variables.
		"prototypejs": false,	// prototypejs global variables.
		"shelljs": false,				// shelljs global variables.
		"meteor": false,			// meteor global variables.
		"mongo": false,			// mongo global variables.
		"applescript": false,	// applescript global variables.
		"es6": false,					// enable all ECMAScript 6 features except for modules.
	},
	"extends": "eslint:recommended",
	"rules": {
		"indent": [
			"error",
			"tab"
		],
		"linebreak-style": [
			"error",
			"windows"
		],
		"curly": [
			"error",
			"all"
		],
		"no-cond-assign": [
			"error",
			"always"
		],
		"quotes": [
			"error",
			"double"
		],
		"multiline-comment-style": [
			"error",
			"starred-block"
		],
		"eqeqeq": [
			"error",
			"smart"
		],
		"operator-assignment": [
			"error",
			"always"
		],
		"multiline-ternary": [
			"error",
			"always-multiline"
		],
		"space-in-parens": [
			"error",
			"always",
			{
				"exceptions": ["empty"]
			}
		],
		"operator-linebreak": [
			"error",
			"before"
		],
		"no-multi-spaces": [
			"error",
			{ "ignoreEOLComments": true }
		],
		"no-trailing-spaces": [
			"error",
			{
				"skipBlankLines": false,
				"ignoreComments": false
			}
		],
		"no-multiple-empty-lines": [
			"error",
			{ "max": 0 }
		],
		"array-bracket-newline": [
			"error",
			{ "minItems": 1 }
		],
		"semi": [
			"error",
			"always"
		]
	}
};