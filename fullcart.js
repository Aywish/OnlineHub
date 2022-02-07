var userID = localStorage.getItem("userID");


var cartReference = firebase.database().ref().child("users/" + userID + "/cart/");

cartReference.on("child_added", snap => {

  var orderID = snap.child("orderID").val();
  var prodID = snap.child("prodId").val();
  var prodName = snap.child("prodName").val();
  var prodDesc = snap.child("prodDesc").val();
  var prodPrice = snap.child("prodPrice").val();
  var shoemakerName = snap.child("shoemakerName").val();
  var orderQty = snap.child("quantity").val();
  var orderTotal = snap.child("total").val();
  var color = "White";
  var size = "39;"

  $(".cart-items").append('<tr><td class="checkbox"><input type="checkbox" name=""></td><td><img class="product-image" src="images/1.jpg"></td><td class="prod-details"><p class="shoename cart-col2">' + prodName + '</p><p class="shoemaker cart-col2">' + shoemakerName + '</p> </td><td><table class="specs"><tr class="spec-row"><td class="spec-title">Color: </td> <td class="spec-value">' + color + '</td></tr><tr class="spec-row"><td class="spec-title">Size: </td><td class="spec-value">' + size + '</td></tr>  <tr class="spec-row"><td class="spec-title">Qty: </td><td class="spec-value">' + orderQty + '</td></tr></table></td><td><p class="price"> ₱' + orderTotal + '.00</p><a href="#" class="message-button-disabled">MESSAGE SHOEMAKER</a></td></tr>');

  //console.log(prodID + " " + prodPrice + " " + orderTotal);

});

