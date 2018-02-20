"use strict";
const BIG_NUM = require("bignumber.js");
const MOMENT = require("moment");
module.exports = class Format {
	static toDollar(num) {
		return "$"+new BIG_NUM(num).toFormat(2);
	}
	static toNum(num) {
		return parseFloat(num).toFixed(2);
	}
	static toSentance(words) {
		return `${words.slice(0,1).toUpperCase()}${words.slice(1)}.`;
	}
	static toDate(num) {
		let get = {
			date: num,
			oldFormat: "YYYY-MM-DDTHH:mm:ss:SSSZ",
			newFormat: "MMMM Do, YYYY HH:mm:ss",
		};
		return MOMENT(get.date, get.oldFormat)
			.format(get.newFormat);
	}
};