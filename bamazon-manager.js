/**
 * Program: bamazon-manager.js
 * Created: 10/20/2016 by 
 * @author: Matt Holland
 * Located: product-database-sql/
 * Purpose: Execute inventory management functions
 */

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
var session = new Session(['View Products For Sale', 'View Low Inventory', 'Add To Inventory', 'Add New Product', 'Exit']);

// Main store orders processing object
var main = {
    // Show manager menu options
    showOptions: function() {
    	inquirer.prompt(
    		[
    			{
					name: "selection",
					message: "Please select from the following options:",
					type: "list",
					choices: session.optsArray
    			}
    	]).then(function(answers) {
    		// Clear the product id array and the product name array each time a selection is made
    		main.prodIdArray = [];
    		// Initialize result holder and return data object for switch assignment
    		var result;
    		var dataObj;
    		
			switch(answers.selection) {
				// Show table of all products
				case session.optsArray[0]: 
						db.conn.query(query.getItems(viewLow = false), function(err, res) {
							if (err) throw err;
							// Create/show new product table, and establish the returned prod Id array for later menu use
							var prodTable = new StoreTable(res);
							prodTable.showTable();
							// Save as global so may be used in later menu selections for Add To Inventory option
							var prodIdArray = prodTable.prodIdArray;
    	    				main.showOptions();
						});
					break;
				// Show table of products with low inventory, and show user options to increase product stock
				case session.optsArray[1]:
						db.conn.query(query.getItems(viewLow = true), function(err, res) {
							if (err) throw err;
							// If there are no low inventory items, return user to main menu
							if(res.length == 0) {
								console.log("There are no items with inventory of less than five units.  You will be redirected back to the main menu shortly.");
								setTimeout(main.showOptions, 3500);
								return;
							}
    	    				// Create/show new product table, and establish the returned prod Id array for later menu use
							var prodTable = new StoreTable(res);
							prodTable.showTable();
							var prodIdArray = prodTable.prodIdArray;
							// Ask user if they would like to add to inventory
    	    				inquirer.prompt(
    	    					[
    	    						{
    	    							name: "selection",
    	    							message: "Would you like to order additional stock for any of the above inventory?",
    	    							type: "input",
    	    							validate: function(str) {
    	    								return (session.validYesNo.test(str));
    	    							}
    	    						}
    	    				]).then(function(answers) {
    	    					// Allow user to select items to order, and then execute purchase instruction
    	    					if(answers.selection.toUpperCase() == 'Y') {
    	    						var msgOne = "Please select an item to order from the following list:";
    	    						var msgTwo = "How many would you like to purchase?";
    	    						main.addInventory(msgOne, msgTwo, prodIdArray, res);
    	    					} else {
    	    						main.returnToMainMenu();
    	    					}
    	    				});
						});
					break;
				// User selected to add additional inventory
				case session.optsArray[2]:
					// Produce the product table for reference
					db.conn.query(query.getItems(viewLow = false), function(err, res) {
						if (err) throw err;
						// Create/show new product table, and establish the returned prod Id array for later menu use
						var prodTable = new StoreTable(res);
						prodTable.showTable();
						var prodIdArray = prodTable.prodIdArray;
						// Allow user to select items to order, and then execute purchase instruction
						var msgOne = "Please select the item for which you would like to add additional inventory:";
						var msgTwo = "How many would you like to add to inventory?";
						main.addInventory(msgOne, msgTwo, prodIdArray, res);
    	    		});
					break;
				// User selected to add a new product
				case session.optsArray[3]:
					// Show the department table for user to reference correct department ID, and create dept id array for menu slection
					db.conn.query(query.getDepartments(), function(err, res) {
						if(err) throw err;
						var deptTable = new StoreTable(res);
						deptTable.showDeptTable(execOpts = false);
						var deptIdArray = deptTable.deptIdArray;
						main.addNewItem(deptIdArray, res);
					});
					break;
				// User chose to exit the program
				default:
					session.exitSystem();
					break;
			}
    	});
    },

    // If user confirms their order, update the store inventory
	confirmOrder: function(prodId, prodName, unitPrice, storeQty, custQty) {
		// Format total purchase price to display to customer
		totalCost = session.formatNum((unitPrice * custQty).toFixed(2));

		inquirer.prompt(
		    [
				{
					name: "confirm",
					message: "You have requested to add " + custQty + " of the " + prodName + " product to your inventory. This will cost $" + totalCost + ". Proceed? (Y/N)",
					type: "input",
					validate: function(str) {
						return (session.validYesNo.test(str));
					}
				}
		]).then(function(answers) {
			if(answers.confirm.toUpperCase() == 'Y') {
				// Calculate updated quantity for db insertion
				var newQty = (storeQty + parseInt(custQty));
				// Update the product database
				db.conn.query(query.updateInventory(), [newQty, prodId], function(err, res) {
					if(err) {
   						console.log('There was a query error: ' + err);
   					} else {
   						// Show purchase confirmation message, and then ask if they would like to add any other inventory
   						main.orderAgain(custQty, prodName, totalCost, purchased = true);
   						//console.log('You purchased ' + custQty + ' of the ' + prodName + ' product for $' + totalCost + ' successfully!');
   					}
				});
			} else {
				// Show message, and then ask if they would like to return to the main menu
				main.orderAgain(custQty, prodName, totalCost, purchased = false);
			}
		});
	},

	// Ask user if they would like to order additional inventory (used for 'Add To Inventory' and 'View Low Inventory' options)
	addInventory: function(msgOne, msgTwo, prodIdArray, res) {
		inquirer.prompt(
    		[
    			{
    				name: "id",
    				message: msgOne,
    				type: "list",
    				choices: prodIdArray
    			},

    			{
    				name: "qty",
    				message: msgTwo,
					type: "input",
					validate: function(str) {
						return (session.validNum.test(str));
					}
    			}
    	]).then(function(answers) {
    		// Find the index of the product selected, to enable access to product details
			var index     = prodIdArray.indexOf(answers.id);
			var storeQty  = res[index].stock_qty;
			var prodId    = answers.id;
			var prodName  = res[index].prod_name;
			var unitPrice = res[index].price;
			// Confirm the order & update the inventory
    		main.confirmOrder(answers.id, prodName, unitPrice, storeQty, answers.qty);
    	});
	},

	// Ask the user if they would like to order anything else
	orderAgain: function(custQty, prodName, totalCost, purchased) {
		var msg = "";
		if(purchased) {
			msg += 'You have added ' + custQty + ' of the ' + prodName + ' product to your inventory, at a total cost of $' + totalCost + '. Would you like to place another order? (Y/N)';
		} else {
			msg += 'Would you like to return to the main inventory management menu? (Y/N)';
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
				main.returnToMainMenu();
			} else {
				// Show thank you message, and then exit the program
				session.exitSystem();
			}
		});
	},

	addNewItem: function(deptIdArray, res) {
		inquirer.prompt(
			[
				{
					name: "deptId",
					message: "In which department would you like to add the new product? (see IDs above)",
					type: "list",
					choices: deptIdArray,
					validate: function(str) {
						return (session.validNum.test(str));
					}
				},

				{
					name: "prodName",
					message: "Please enter the name of the new product which you would like to add to the system:",
					type: "input",
				},

				{
					name: "price",
					message: "Please enter the unit consumer price of the new item (i.e. 000.00):",
					type: "input",
					validate: function(str) {
						return (session.validDollar.test(str));
					}

				},

				{
					name: "qty",
					message: "Please enter the number of units of the new product which you would like to add:",
					type: "input",
					validate: function(str) {
						return (session.validNum.test(str));
					}
				},

				{
					name: "confirm",
					message: "You have selected to add a new product to the system.  Proceed? (Y/N)",
					type: "input",
					validate: function(str) {
						return (session.validYesNo.test(str));
					}
				}
		]).then(function(answers) {
			// Find department name for confirmation msg
			var index     = deptIdArray.indexOf(answers.deptId);
			var deptName  = res[index].dept_name;
			if(answers.confirm.toUpperCase() == 'Y') {
				// Insert new product into the database, and then show confirmation message
				db.conn.query(query.addItem(/*answers.prodName, answers.deptId, answers.price, answers.qty*/), [answers.prodName, answers.deptId, answers.price, answers.qty], function(err, res) {
					if(err) throw err;
					inquirer.prompt(
						[
							{
								name: "selection",
								message: "Thank you. You have added " + answers.qty + " of the new item " + answers.prodName + " to the inventory of the " + deptName + " department successfully, at a total price of $" + session.formatNum(answers.qty + answers.price) + ". Would you like to add another new item? (Y/N)",
								type: "input",
								validate: function(str) {
									return (session.validYesNo.test(str));
								}
							}
					]).then(function(answers) {
						if(answers.selection.toUpperCase() == 'Y') {
							// Recursively call the function again
							main.addNewItem(deptIdArray, res);
						} else {
							// Return user to main menu
							main.returnToMainMenu();
						}
					});
				});
			} else {
				// Return user to main menu
				main.returnToMainMenu();
			}
		});
	},

	returnToMainMenu: function() {
        console.log("Thank you.  You will be redirected to the main menu shortly.");
        setTimeout(main.showOptions, 3500);
    },
}
// Run the program
main.showOptions();