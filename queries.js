// Provide query templates
var query = {

	queryAllItems: `SELECT a.id, prod_name, dept_name, price, stock_qty FROM product a
    	        	LEFT JOIN department b ON (a.dept_id = b.id) 
    	        	ORDER BY a.id ASC;`,

   	updateInventory: `UPDATE product SET stock_qty = ? WHERE id = ?`
}

// Export to main program
module.exports = query;