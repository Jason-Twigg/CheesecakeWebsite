var express = require('express');
var router = express.Router();
var dbms = require('../public/javascripts/dbms');

// Post handler for creating new entry of an order
router.post('/', function(req, res, next) {

  // Retrieve the quantity, topping, and notes from the request body
  let quantity = req.body.quantity;
  let topping = req.body.topping;
  let notes = req.body.notes;

  // Hardcode the date as February 15th
  let month = "FEB";
  let day = 15;

  // Use all of the variables that were just created to create a SQL query
  let command = `INSERT INTO ORDERS (MONTH, DAY, QUANTITY, TOPPING, NOTES) ` +
                `VALUES ('${month}', ${day}, ${quantity}, '${topping}', '${notes}')`;
  console.log(`SQL Query: ${command}`);

  // Run the SQL query and then return the result from adding that entry.
  dbms.dbquery(command, (error, results) => {
    console.log(results);
    res.send(results);
  })
  
});

module.exports = router;
