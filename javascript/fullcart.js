var userID = localStorage.getItem("userID");


var custUser;

var CustLogout = document.getElementById("custlogout");


//Check if user is logged in
firebase.auth().onAuthStateChanged(function(custUser) {
  if (!custUser) {
    //Redirect user to login if not logged in
    alert("Can't access, please login first");
    location.href='../index.html'; 
  }
});

var cartReference = firebase.database().ref().child("users/" + userID + "/cart/");

cartReference.on("child_added", snap => {
  var oID = snap.child("orderID").val();
  var prodName = snap.child("prodName").val();
  var prodPrice = snap.child("prodPrice").val();
  var prodColor = snap.child("prodColor").val();
  var prodSize = snap.child("prodSize").val();
  var orderQty = snap.child("prodQty").val();
  var cshmkrName = snap.child("shoemakerName").val();


  $(".cart-items").append('<tr>z<td><img class="product-image" src="images/1.jpg"></td><td class="prod-details"><p class="shoename cart-col2">' + prodName + '</p><p class="shoemaker cart-col2">' + cshmkrName + '</p> </td><td><table class="specs"><tr class="spec-row"><td class="spec-title">Color: </td> <td class="spec-value"> '+ prodColor + '</td></tr><tr class="spec-row"><td class="spec-title">Size: </td><td class="spec-value"> ' + prodSize + ' </td></tr>  <tr class="spec-row"><td class="spec-title">Qty: </td><td class="spec-value"> ' + orderQty + ' </td></tr></table></td><td><p class="price"> ₱' + prodPrice + '.00</p><button class="delete-button" onclick="deleteOrder(' + oID + ')">DELETE</button></td></tr>');
});


function deleteOrder(id)
{    
  console.log("Product ID: " + id);
  var productReference = firebase.database().ref().child("users/" + userID + "/cart/" + id);
  warning = "Are you sure you want to remove this item from your cart?";

  if (confirm(warning) == true) {
      productReference.remove();

      alert("Product Successfully Removed");
  } 

  location.reload();
}


CustLogout.onclick = function () {

  firebase.auth().signOut().then(() => {

    location.href='index.html';  
    localStorage.clear();

  }).catch((error) => {
    console.log(error);
    // An error happened.
  });
};
