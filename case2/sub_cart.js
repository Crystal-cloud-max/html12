"use strict";

//runs function after browser is loaded
window.addEventListener("load", setupCart);

//function to add new item to the shopping cart after clicked
function setupCart() {
    var addButtons = document.getElementsByClassName("addButton");
    for (var i = 0; i < addButtons.length; i++) {
        addButtons[i].onclick = addItem;//call function
    }
}
/*  Adds the food item associated with the Add to Order button to the shopping
    cart, keeping track of the number of items of each product ordered by
    the customer.
*/
function addItem(e) {
    //button clicked by customer
    var foodItem = e.target.nextElementSibling;//children elements for section#items
    var foodID = foodItem.id;//refer to div.menuItem div id

    //create a copy of the foodItem variable and all its element descendants
    var foodDescription = foodItem.cloneNode(true);

    var cartBox = document.getElementById("cart");//for shopping cart on the side

    /*shopping cart needs to determine whether a product ordered by customer is ordered*/
    var duplicateOrder = false;

    //add duplicate items to cart box start from 1st child until next tag while not empty
    for (var n = cartBox.firstElementChild; n != null; n = n.nextElementSibling) {
        //if so customer has previously placed that menu item in the cart
        if (n.id === foodID) {
            duplicateOrder = true;

            //indicate additional order upon selection
            n.firstElementChild.textContent++;
            break;
        }
    }

    //if already ordered in shopping cart
    if (duplicateOrder === false) {
        //create span tag in aside#cart div#item(no)
        var orderCount = document.createElement("span");
        orderCount.textContent = "1";//display in span tag created

        //display number of orders before food description
        foodDescription.insertBefore(orderCount, foodDescription.firstChild);

        //appending as new product order
        cartBox.appendChild(foodDescription);//add to aside#cart
    }
}

