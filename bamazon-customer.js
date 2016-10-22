// Include necessary files
var inquirer   = require('inquirer')             ,
    Table      = require('cli-table')            ,
    Session    = require('./modules/new-session'),
    StoreTable = require('./modules/store-table'),
    db         = require('./modules/db-connect') ,
    query      = require('./modules/queries')    ;

// Establish db connection
db.connect();

// Initialize the new user session
var session = new Session([]);

// Main store orders processing object
var main = {
	// Display all items available for sale on itinial page load, and ask customer what they would like to purchase
	displayItems: function() {
    	db.conn.query(query.getItems(viewLow = false),function(err, res){
    	    if (err) throw err;
    	    // Create/show new product table, and establish the returned prod Id array for later menu use
    	    console.log("Current Products Available:");
			var prodTable = new StoreTable(res);
			prodTable.showTable();
			var prodIdArray = prodTable.prodIdArray;
    	    inquirer.prompt(
				[
					{	
						name: "id",
						message: "Please select the ID of the product you wish to purchase: ",
						type: "list",
						choices: prodIdArray
					},
	
					{
						name: "qty",
						message: "How many would you like to purchase?",
						type: "input",
						validate: function(str) {
							return (session.validNum.test(str));
						}
					}
			]).then(function(answers) {
				// Find the index of the product selected, to enable quantity checking (already have the info available from SELECT query)
				var index     = prodIdArray.indexOf(answers.id);
				var storeQty  = res[index].stock_qty;
				var prodId    = answers.id;
				var deptId    = res[index].dept_id;
				var prodName  = res[index].prod_name;
				var unitPrice = res[index].price;
	
				// If user requested a quantity less than current stock, update the db.  Otherwise, prompt for another quantity entry
				if(answers.qty < storeQty) {
					main.confirmOrder(deptId, prodId, prodName, unitPrice, storeQty, answers.qty);
				} else {
					// Use inquirer to prompt for another quantity entry
					inquirer.prompt(
						[
						  {
						  	name: "qty",
						  	message: "Sorry, but we only have " + storeQty + " " + prodName + " in stock! Please enter another quantity.",
						  	type: "input",
						  	// Do not allow entry to go through unless it is a number less than the stock quantity
						  	validate: function(str) {
						  		if (session.validNum.test(str)) {
						  			if(parseInt(str) > storeQty) {
						  				return false;
						  			} else {
						  				return true;
						  			}
						  		} else {
						  			return false;
						  		}
						  	}
						  }
					]).then(function(answers) {
						main.confirmOrder(deptId, prodId, prodName, unitPrice, storeQty, answers.qty);
					});
				}
			});
		});
	},

	// If customer confirms their order, update the store inventory
	confirmOrder: function(deptId, prodId, prodName, unitPrice, storeQty, custQty) {
		// Format total purchase price to display to customer
		totalCost = session.formatNum((unitPrice * custQty).toFixed(2));

		inquirer.prompt(
		    [
				{
					name: "confirm",
					message: "You have requested to purchase " + custQty + " of the " + prodName + " product. This will cost $" + totalCost + ". Proceed? (Y/N)",
					type: "input",
					validate: function(str) {
						return (session.validYesNo.test(str));
					}
				}
		]).then(function(answers) {
			if(answers.confirm.toUpperCase() == 'Y') {
				// Calculate updated quantity for db insertion
				var newQty = (storeQty - custQty);
				// Update the product database
				db.conn.query(query.updateInventory, [newQty, prodId], function(err, res) {
					if(err) throw err;
   					// Now update product_sales in department table
   					db.conn.query(query.updateDeptSales(), [(unitPrice * custQty), deptId], function(err, res) {
   						if(err) throw err;
   						// Show purchase confirmation message, and then ask if they would like to make another purchase
   						main.orderAgain(custQty, prodName, totalCost, purchased = true);
   					});
				});
			} else {
				// Show message, and then ask if they would like to continue shopping
				main.orderAgain(custQty, prodName, totalCost, purchased = false);
			}
		});
	},

	orderAgain: function(custQty, prodName, totalCost, purchased) {
		var msg = "";
		if(purchased) {
			msg += 'You purchased ' + custQty + ' of the ' + prodName + ' product for $' + totalCost + ' successfully! Would you like to place another order? (Y/N)';
		} else {
			msg += 'Sorry to hear that you are no longer interested in the ' + prodName + ". Would you like to continue shopping? (Y/N)";
		}
		inquirer.prompt(
			[
				{
					name: 'confirm',
					message: msg,
					type: "input",
					validate: function(str) {
						return (session.validYesNo.test(str));
					}
				}
		]).then(function(answers) {
			if(answers.confirm.toUpperCase() == 'Y') {
				// Run the main program again
				main.displayItems();
			} else {
				// Show thank you message, and then exit the program
				console.log("Thank you for shopping with us!  Please come again soon.");
				process.exit();
			}
		});
	}
}

// Initialize the order fulfillment system
main.displayItems();