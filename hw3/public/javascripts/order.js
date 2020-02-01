//Start of JQuery and Javascript Script

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

        $("#dropbutton").text($(this).text());

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