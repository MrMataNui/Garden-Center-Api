"use strict";
const BIG_NUM = require("bignumber.js");
const MOMENT = require("moment");
module.exports = class Format {
	static toDollar(num) {
		return "$"+new BIG_NUM(num).toFormat(2);
	}
	static toNum(num) {
		return new BIG_NUM(num).toNumber().toFixed(2);
	}
	static toDate(num) {
		let get = {
			date: num,
			oldFormat: "YYYY-MM-DDTHH:mm:ss:SSSZ",
			newFormat: "MMMM Do, YYYY hh:mm:ss a",
		};
		return MOMENT(get.date, get.oldFormat)
			.format(get.newFormat);
	}
};