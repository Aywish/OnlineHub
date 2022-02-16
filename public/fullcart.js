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

  var prodName = snap.child("prodName").val();
  var prodPrice = snap.child("prodPrice").val();
  var cshmkrName = snap.child("shoemakerName").val();


  $(".cart-items").append('<tr><td class="checkbox"><input type="checkbox" name=""></td><td><img class="product-image" src="images/1.jpg"></td><td class="prod-details"><p class="shoename cart-col2">' + prodName + '</p><p class="shoemaker cart-col2">' + cshmkrName + '</p> </td><td><table class="specs"><tr class="spec-row"><td class="spec-title">Color: </td> <td class="spec-value">White</td></tr><tr class="spec-row"><td class="spec-title">Size: </td><td class="spec-value">6</td></tr>  <tr class="spec-row"><td class="spec-title">Qty: </td><td class="spec-value">1</td></tr></table></td><td><p class="price"> ₱' + prodPrice + '.00</p></td></tr>');

});


CustLogout.onclick = function () {

  firebase.auth().signOut().then(() => {

    location.href='index.html';  
    localStorage.clear();

  }).catch((error) => {
    console.log(error);
    // An error happened.
  });
};