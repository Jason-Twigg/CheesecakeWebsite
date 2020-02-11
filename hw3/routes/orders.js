var express = require('express');
var router = express.Router();

// Create 4 difference cheese cake objects, each
// with their own topping and quantity
var cheesecake01 = { 
  topping: "cherry",
  quantity:"2"
};

var cheesecake02 = { 
  topping: "plain",
  quantity:"6"
};

var cheesecake03 = { 
  topping: "chocolate",
  quantity:"3"
};

var cheesecake04 = { 
  topping: "cherry",
  quantity:"10"
};

// Create an array to hold all of the cheesecake objects
let cheesecakes = [cheesecake01, cheesecake02,
                  cheesecake03, cheesecake04]

// Using the JSON stringify method to turn the array into
// a json string.
var jsonString = JSON.stringify(cheesecakes);

/* GET orders listing.  */
router.get('/', function(req, res, next) {
  res.send(jsonString);
});

// POST orders listing
router.post('/', function(req, res, next) {
  res.send(jsonString);
});

module.exports = router;
