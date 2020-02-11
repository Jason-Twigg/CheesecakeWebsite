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
        $("#quantityTitle").html("Thank you! Your order has been placed.<br>" +
        "Order Info: " + $("#quantityDropDown").val() + " " +
        $("input[name='topping']:checked").val() + " Cheesecakes" +  "<br>" +
        "Notes: " + $("#notes").val() + "<br>"
        );
        $("form").hide();

    }
}

eventHandlerMonthDiv = function () {

        // Set the text of the drop down button to the last month selected
        $("#dropbutton").text($(this).text());

        // Calls a post command using the jQuery method
        $.post("http://localhost:3000/orders", function(data, status){

            //This function is called if the call was successful.
            //First we parse the data into cheesecakes, and assume that
            //this data is in array format
            var cheesecakes = JSON.parse(data);

            //We retrieve the unordered list by its id 'orderlist', and
            //then clear its items.
            var ul = document.getElementById("orderlist");
            ul.innerHTML = "";

            //Loop through each entry from the data retrieved, we will
            //retrieve the items quantity and topping and enter that
            //as a new list item and add it to the unordered list
            for (var i = 0; i < cheesecakes.length; i++){
                var cheesecake = cheesecakes[i];
                var cheesecakeStr = cheesecake.quantity + " " +
                                    cheesecake.topping;
                var li = document.createElement("li");
                li.appendChild(document.createTextNode(cheesecakeStr));
                ul.appendChild(li);
            }


        });

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