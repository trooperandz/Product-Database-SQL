/**
 * Program: new-session.js
 * Created: 10/22/2016 by 
 * @author: Matt Holland
 * Located: product-database-sql/modules/
 * Purpose: Initialize a new user session
 */

"use strict";

class Session {
	constructor(optsArray) {
		this.optsArray   = optsArray;
		this.validNum    = /[0-9]/;
    	this.validYesNo  = /[YyNn]/;
    	this.validDollar = /^(?:|\d{1,15}(?:\.\d{2,2})?)$/;
	}

	formatNum(num) {
		return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}

    exitSystem() {
        console.log("Thank you for using the Tesla inventory system.  You are now logged out.");
        process.exit();
    }
}

module.exports = Session;