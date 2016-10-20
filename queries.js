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
   	/*
   	getItems2: function(viewLow) {
		var stmt = `SELECT a.id, prod_name, dept_name, price, stock_qty FROM product a
    	        	LEFT JOIN department b ON (a.dept_id = b.id) `;
    	if(viewLow) {
    		stmt += ` WHERE stock_qty <= 5 `;
    	}

    	stmt += ` ORDER BY a.id ASC;`

    	db.conn.query(stmt, function(err, res) {
    		//console.log('res: ' + res);
    		if(err) throw err;
    		// Initialize Terminal table display plugin
    	    var table = new Table({
    	    	head: ['ID', 'Name', 'Price', 'Qty', 'Dept'],
    	    	colWidths: [7, 20, 15, 7, 20]
    	    });
    	    // Initialize product id array for later menu selection
    	    var prodIdArray = [];
    	    var i = 0;
    	    while(i < res.length) {
    	    	var prod = res[i];
    	    	prodIdArray.push(prod.id);
    	    	table.push([prod.id, prod.prod_name, prod.price, prod.stock_qty, prod.dept_name]);
    	    	i++;
    	    }
    	    //console.log(table.toString());
    	    return { prodIdArray:prodIdArray, prodTable:table };
    	});
   	},*/

   	// Create SQL statement for update product quantity amount
   	updateInventory: `UPDATE product SET stock_qty = ? WHERE id = ?`
}

// Export to main program
module.exports = query;