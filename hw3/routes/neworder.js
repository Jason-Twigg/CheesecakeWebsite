var express = require('express');
var router = express.Router();
var dbms = require('../public/javascripts/dbms');

// POST orders listing
router.post('/', function(req, res, next) {

  let quantity = req.body.quantity;
  let topping = req.body.topping;
  let notes = req.body.notes;
  let month = "FEB";
  let day = 15;

  let command = `INSERT INTO ORDERS (MONTH, DAY, QUANTITY, TOPPING, NOTES) ` +
                `VALUES ('${month}', ${day}, ${quantity}, '${topping}', '${notes}')`;
  console.log(`SQL Query: ${command}`);
  dbms.dbquery(command, (error, results) => {
    console.log(results);
    res.send(results);
  })
  //res.send(jsonString);
  //res.send("");
});

module.exports = router;
