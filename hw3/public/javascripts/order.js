//Jason Twigg
//Start of JQuery and Javascript Script
//Holder of functions for cheesecake website

eventHandlerOrder = function (){
    
    if($("#notes").val().indexOf("vegan") >= 0){
        alert("WARNING! These cheesecakes contain dairy!");
    }
    // How to reference checked radiobutton:
    // https://www.tutorialrepublic.com/faq/how-to-get-the-value-of-selected-radio-button-using-jquery.php
    else {
        let quantity = $("#quantityDropDown").val();
        let topping = $("input[name='topping']:checked").val();
        let notes = $("#notes").val();
        $("#quantityTitle").html("Thank you! Your order has been placed.<br>" +
        "Order Info: " + quantity + " " +
        topping + " Cheesecakes" +  "<br>" +
        "Notes: " + notes + "<br>"
        );
        $("form").hide();

        $.post("http://localhost:3000/neworder",
            {"quantity": quantity,  "topping": topping, "notes": notes},
            function(data){

                alert(quantity + " " + topping + " " + notes);

        });

    }
}

eventHandlerMonthDiv = function () {

        // Set the text of the drop down button to the last month selected
        $("#dropbutton").text($(this).text());

        //alert("hi1");

        // Calls a post command using the jQuery method
        $.post("http://localhost:3000/orders", {"month":$(this).text().toUpperCase()}, function(data){
            
            //alert("hi2");

            //This function is called if the call was successful.
            //First we parse the data into cheesecakes, and assume that
            //this data is in array format
            //var cheesecakes = JSON.parse(data);
            var cheesecakes = data;

            //We retrieve the unordered list by its id 'orderlist', and
            //then clear its items.
            var ul = document.getElementById("orderlist");
            ul.innerHTML = "";

            var plain = 0;
            var chocolate = 0;
            var cherry = 0;

            //console.log("hi");

            for (var i = 0; i < cheesecakes.length; i++){

                var cheesecake = cheesecakes[i];
                //alert(cheesecake.QUANTITY + " " + cheesecake.TOPPING + plain + " " + chocolate + " " + cherry);
                switch (cheesecake.TOPPING){
                    case ("Plain"):
                        plain += parseInt(cheesecake.QUANTITY);
                        break;
                    case ("Chocolate"):
                        chocolate += parseInt(cheesecake.QUANTITY);
                        break;
                    case ("Cherry"):
                        cherry += parseInt(cheesecake.QUANTITY);
                        break;
                    default:
                        console.log("error finding type");
                }
            }
            var plainListItem = document.createElement("li");
            plainListItem.appendChild(document.createTextNode(plain + " Plain"));
            ul.appendChild(plainListItem);
            var chocolateListItem = document.createElement("li");
            chocolateListItem.appendChild(document.createTextNode(chocolate + " Chocolate"));
            ul.appendChild(chocolateListItem);
            var cherryListItem = document.createElement("li");
            cherryListItem.appendChild(document.createTextNode(cherry + " Cherry"));

 
            ul.appendChild(cherryListItem);
           


        });

        //alert("hi3");

}

//waits for document to completely load before any code is ran, this is to prevent errors
$(document).ready(function(){
    
    //waits for user to click order, then warns them that the food contains contains dairy if the
    //user requests vegan, if not, then the form dissapears and shows the purchase information
    $("#order").click(eventHandlerOrder);
    
    //Listener for user to click on the drop down for months on the order history, changes the text of the drop
    //down button if the user clicks a month.
    $("div>a").click(eventHandlerMonthDiv);
});