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
var session = new Session(['View Product Sales By Department', 'Create New Department', 'Exit']);

// Main store orders processing object
var main = {
    // Show executive menu options
    showOptions: function() {
        inquirer.prompt(
            [
                {
                    name: "selection",
                    message: "Welcome, executive.  What would you like to do today?",
                    type: "list",
                    choices: session.optsArray
                }
        ]).then(function(answers) {
            switch(answers.selection) {
                // User chose to view department data
                case session.optsArray[0]:
                    db.conn.query(query.getDepartments(exec = true), function(err, res) {
                        if(err) throw err;
                        console.log("Showing: All Department Data");
                        var deptTable = new StoreTable(res);
                        deptTable.showDeptTable(execOpts = true);
                        inquirer.prompt(
                            [
                                {
                                    name: "confirm",
                                    message: "Would you like to do anything further today, Mr. Executive? (Y/N)",
                                    type: "input",
                                    validate: function(str) {
                                        return (session.validYesNo.test(str));
                                    }
                                }
                        ]).then(function(answers) {
                            if(answers.confirm.toUpperCase() == 'Y') {
                                // Return user to main menu
                                main.returnToMainMenu();
                            } else {
                                // Log them out
                                session.exitSystem();
                            }
                        });
                    });
                    break;
                // User chose to create a new department
                case session.optsArray[1]:
                    db.conn.query(query.getDepartments(exec = false), function(err, res) {
                        // Show the existing departments for user reference
                        console.log("Showing: Department Categories");
                        var deptTable = new StoreTable(res);
                        deptTable.showDeptTable(execOpts = false);
                        main.addNewDepartment();
                    });
                    break;
                default:
                    session.exitSystem();
                    break;
            }
        });
    },

    addNewDepartment: function() {
        inquirer.prompt(
            [
                {
                    name: "deptName",
                    message: "Please enter the new department name (use above table for existing name reference):",
                    type: "input"
                },

                {
                    name: "cost",
                    message: "Please enter the total overhead costs associated with the new department (i.e. 00000.00):",
                    type: "input",
                    validate: function(str) {
                        return (session.validDollar.test(str));
                    }
                }
        ]).then(function(answers) {
            // Save vars for later use
            var deptName = answers.deptName;
            var cost = answers.cost;
            // Confirm the department addition
            inquirer.prompt(
                [
                    {
                        name: "confirm",
                        message: "You have requested to add the " + deptName + " department to the database, with overhead costs totalling $" + session.formatNum(cost) + ".  Proceed with addition? (Y/N)",
                        type: "input",
                        validate: function(str) {
                            return (session.validYesNo.test(str));
                        }
                    }
            ]).then(function(answers) {
                if(answers.confirm.toUpperCase() == 'Y') {
                    // Insert dept into database
                    db.conn.query(query.addDepartment(), [deptName, cost, 0], function(err, res) {
                        if(err) throw err;
                        inquirer.prompt(
                            [
                                {
                                    name: "confirm",
                                    message: "You have successfully added the new " + deptName + " department to they system. Would you like to add another department? (Y/N)",
                                    type: "input",
                                    validate: function(str) {
                                        return (session.validYesNo.test(str));
                                    }
                                }
                        ]).then(function(answers) {
                            if(answers.confirm.toUpperCase() == 'Y') {
                                // Recursively run the add department function again
                                main.addNewDepartment();
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
        });
    },

    returnToMainMenu: function() {
        console.log("Thank you.  You will be redirected to the main menu shortly.");
        setTimeout(main.showOptions, 3500);
    }
}

// Run the program
main.showOptions();