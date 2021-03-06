/**
 * Program: queries.js
 * Created: 10/19/2016 by 
 * @author: Matt Holland
 * Located: product-database-sql/modules
 * Purpose: Provide query templates for inventory system
 */

var query = {

	// Statement for retrieving products. If viewLow == true, retrieve only those products with a stock <= 5.
	getItems: function(viewLow) {
		var stmt = `SELECT a.id, prod_name, dept_id, dept_name, price, stock_qty FROM product a
    	        	LEFT JOIN department b ON (a.dept_id = b.id) `;
    	if(viewLow) {
    		stmt += ` WHERE stock_qty <= 5 `;
    	}

    	stmt += ` ORDER BY a.id ASC;`

    	return stmt;
   	},

   	// Statement for retrieving department data
   	getDepartments: function(exec) {
   		var stmt = `SELECT *`;

   		if(exec) {
   			stmt += `, (product_sales - overhead_cost) AS total_profit `;
   		}

   		stmt += ` FROM department`;
   		return stmt;
   	},

   	// Statement for adding a new department
   	addDepartment: function() {
   		var stmt = `INSERT INTO department (dept_name, overhead_cost, product_sales)
   					VALUES (?, ?, ?)`;
   		return stmt;
   	},
   	
   	// Statement for adding a new item to inventory
   	addItem: function() {
   		var stmt = `INSERT INTO product (prod_name, dept_id, price, stock_qty)
   					VALUES (?, ?, ?, ?)`;
   		return stmt;
   	},

   	// Statement for update product quantity amount
   	updateInventory: function() {
   		var stmt = `UPDATE product SET stock_qty = ? WHERE id = ?`;
   		return stmt;
   	},

   	// Statement for updating the department table with product sales amount
   	updateDeptSales: function() {
   		var stmt = `UPDATE department SET product_sales = product_sales + ? WHERE id = ?`;
   		return stmt;
   	}
}

// Export to main program
module.exports = query;