var userID = localStorage.getItem("userID");
var custUser, productChecked;

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
  var prodId = snap.child("prodId").val();
  var prodName = snap.child("prodName").val();
  var prodPrice = snap.child("prodPrice").val();
  var prodColor = snap.child("prodColor").val();
  var prodSize = snap.child("prodSize").val();
  var orderQty = snap.child("prodQty").val();
  var imageLink = snap.child("imageLink").val();
  var cshmkrName = snap.child("shoemakerName").val();


  $(".cart-items").append('<tr><td class="checkbox"><input type="checkbox" id="' + prodId + '"  onclick="orderTBS(' + oID + ')"></td><td><img class="product-image" src=" ' + imageLink + ' "></td><td class="prod-details"><p class="shoename cart-col2">' + prodName + '</p><p class="shoemaker cart-col2">' + cshmkrName + '</p> </td><td><table class="specs"><tr class="spec-row"><td class="spec-title">Color: </td> <td class="spec-value"> '+ prodColor + '</td></tr><tr class="spec-row"><td class="spec-title">Size: </td><td class="spec-value"> ' + prodSize + ' </td></tr>  <tr class="spec-row"><td class="spec-title">Qty: </td><td class="spec-value"> ' + orderQty + ' </td></tr></table></td><td><p class="price"> ₱' + prodPrice + '.00</p><button class="delete-button" onclick="deleteOrder(' + oID + ')">DELETE</button></td></tr>');
});

function orderTBS(id) {
  
}

var info = firebase.database().ref("users/" + userID);
info.on("value", function (snap) {
  var fName = snap.val().firstName;
  var lName = snap.val().lastName;
  var cNum = snap.val().contactNo;

  var fullName = fName + ' ' + lName;

  firebase.database()
  .ref("users/" + userID + "/address/" + 1)
  .on("value", function (snap) {
      
      var hNo = snap.val().houseNo;
      var stName = snap.val().streetName;
      var brgy = snap.val().barangay;
      var city = snap.val().city;
      var pCode = snap.val().postalCode;

      $("#infoTable").append('<tr><td class="label"><p>Name</p></td><td class="infoFields"><input type="text" class="fields" id="txtName"></td></tr><tr><td class="label"><p>Contact No</p></td><td class="infoFields"><input type="text" class="fields" id="txtNumber"></td></tr><tr><td class="label"><p>Address</p></td><td class="label"><p id="txtAddress">' + hNo + ' ' + stName + ', ' + brgy + ', ' + city + ', ' + pCode + '</p></td></tr>');
    });

    document.getElementById("txtName").value = fullName;
    document.getElementById("txtNumber").value = cNum;
});

function deleteOrder(id)
{
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
