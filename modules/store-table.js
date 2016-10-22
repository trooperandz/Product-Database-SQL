/**
 * Program: prod-table.js
 * Created: 10/20/2016 by 
 * @author: Matt Holland
 * Located: product-database-sql/
 * Purpose: Display the product table from SQL query result array
 */

"use strict";

// Terminal Table creator plugin
var Table = require('cli-table');

class StoreTable {
	constructor(resultArray) {
		this.resultArray = resultArray;
		this.prodIdArray = [];
		this.deptIdArray = [];
	}

	showTable() {
		// Initialize Terminal table display plugin
    	var table = new Table({
    		head: ['ID', 'Name', 'Price', 'Qty', 'Dept'],
    		colWidths: [7, 20, 15, 7, 20]
    	});
    	// Loop through all query results
    	var i = 0;
    	while(i < this.resultArray.length) {
    		var prod = this.resultArray[i];
    		// Push prod id to array for later user selection
    		this.prodIdArray.push(prod.id.toString());
    		table.push([prod.id, prod.prod_name, prod.price, prod.stock_qty, prod.dept_name]);
    	    i++;
    	}
    	console.log(table.toString());
	}

	showDeptTable(execOpts) {
		// Initialize Terminal table display plugin
		if(execOpts) {
			var table = new Table({
				head: ['ID', 'Department', 'Overhead Costs', 'Product Sales', 'Total Profit'],
				colWidths: [7, 18, 16, 16, 16]
			});
		} else {
			var table = new Table({
				head: ['ID', 'Department'],
				colWidths: [7, 20]
			});
		}
		// Loop through all query results
		var i = 0;
		while(i < this.resultArray.length) {
			var dept = this.resultArray[i];
			// Push dept id to array for later user selection
			this.deptIdArray.push(dept.id.toString());
			if(execOpts) {
				table.push([dept.id, dept.dept_name, dept.overhead_cost, dept.product_sales, dept.total_profit]);
			} else {
				table.push([dept.id, dept.dept_name]);
			}
			i++;
		}
		console.log(table.toString());
	}
}

module.exports = StoreTable;