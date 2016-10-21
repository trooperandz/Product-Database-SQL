// Provide query templates
var query = {

	/**
	 * Create SQL statement to retrieve products from database. 
	 * If viewLow == true, retrieve only those products with a stock <= 5.
	 * @param {boolean} viewLow True == all items, false == qty <= 5
	 * @return {string} stmt The executable query statement
	 */
	getItems: function(viewLow) {
		var stmt = `SELECT a.id, prod_name, dept_name, price, stock_qty FROM product a
    	        	LEFT JOIN department b ON (a.dept_id = b.id) `;
    	if(viewLow) {
    		stmt += ` WHERE stock_qty <= 5 `;
    	}

    	stmt += ` ORDER BY a.id ASC;`

    	return stmt;
   	},

   	getDepartments: function() {
   		var stmt = `SELECT id, dept_name FROM department`;
   		return stmt;
   	},
   	
   	addItem: function(prodName, deptId, price, stock_qty) {
   		var stmt = `INSERT INTO product (prod_name, dept_id, price, stock_qty)
   					VALUES ("`+prodName+`", `+deptId+`, `+price+`, `+stock_qty+`)`;
   		console.log('stmt: ' + stmt);
   		return stmt;
   	},

   	// Create SQL statement for update product quantity amount
   	updateInventory: `UPDATE product SET stock_qty = ? WHERE id = ?`
}

// Export to main program
module.exports = query;