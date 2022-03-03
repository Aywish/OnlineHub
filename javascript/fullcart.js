var userID = localStorage.getItem("userID");
var custUser, productChecked;

var CustLogout = document.getElementById("custlogout");
var submitOrder = document.getElementById("btnSubmitOrder");


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
  var cshmkrId = snap.child("shoemakerId").val();

  console.log(cshmkrId)


  $(".cart-items").append('<tr><td class="checkbox"><input type="checkbox" class="selection" name="selection"></td><td><img class="product-image" src=" ' + imageLink + ' "></td><td class="prod-details"><p class="shoename cart-col2">' + prodName + '</p><p class="shoemaker cart-col2">' + cshmkrName + '</p><p style="display:none" class="imageLink">' + imageLink + '</p><p style="display:none" class="id">' + prodId + '</p> <p style="display:none"  class="oid">' + oID + '</p></td><td><table class="specs"><tr class="spec-row"><td class="spec-title">Color: </td> <td class="color-value"> '+ prodColor + '</td></tr><tr class="spec-row"><td class="spec-title">Size: </td><td class="size-value"> ' + prodSize + ' </td></tr>  <tr class="spec-row"><td class="spec-title">Qty: </td><td class="qty-value"> ' + orderQty + ' </td></tr></table></td><td><p class="price" value="' + prodPrice + '"> ₱' + prodPrice + '.00</p><button class="delete-button" onclick="deleteOrder(' + oID + ')">DELETE</button></td><p class="hiddenShmkrId"> ' + cshmkrId + ' </p></tr>');
});

  //Index getter
  $("#btnSubmitOrder").click(function () {
    var checked = [];

    $("input[name='selection']").each(function (i) {
      if(this.checked){
          checked.push(parseInt($(this).val()));
          //alert("The index is " + i + " and the value is " + $(this).val());
          productChecked = i;
      }
    });
  });

function checkItemSelected(){
  //#region ID Generator YEARMONTHDAYHOURSMINUTESSECONDS
  var today = new Date();
  var time = new Date().getFullYear() + "" + new Date().getMonth()  + 1 + "" + new Date().getDate()  + "" + today.getHours() + "" + today.getMinutes() + "" + today.getSeconds();
  var orderID = time;
 
  //#endregion
 
   var inputs = document.getElementsByTagName("input");
   var imageLinks = document.getElementsByClassName("imageLink");
   var prodIds = document.getElementsByClassName("id");
   var oid = document.getElementsByClassName("oid");
   var cshmkrids = document.getElementsByClassName("hiddenShmkrId");
   var prodNames = document.getElementsByClassName("shoename cart-col2");
   var prodPrices = document.getElementsByClassName("price");
   var prodColors = document.getElementsByClassName("color-value");
   var prodSizes = document.getElementsByClassName("size-value");
   var orderQtys = document.getElementsByClassName("qty-value");
   var cshmkrNames = document.getElementsByClassName("shoemaker cart-col2");
   
   var inputObj;
   var selectedCount = 0;

   for(var counter = 0 ; counter < inputs.length ; counter++) {
    inputObj = inputs[counter];
    var type = inputObj.getAttribute("type");
    if (type == 'checkbox' && inputObj.checked) {
      selectedCount++;
    }
  }
  //alert(selectedCount);


  if(selectedCount > 1){
    for(var count = 0 ; count < selectedCount ; count++) {
    
      var savedOrderID = orderID.toString();
      var orderid = orderID.toString() + count.toString();
      var currOrderID =  oid[count].innerHTML;
      var orderQuantity = orderQtys[count].innerHTML;
      var cProdID = prodIds[count].innerHTML;
      var cProdName = prodNames[count].innerHTML;
      var cProdPrice = prodPrices[count].getAttribute("value");
      var cImageLink = imageLinks[count].innerHTML;
      var cProdSize = prodSizes[count].innerHTML;
      var cProdColor = prodColors[count].innerHTML;
      var shmkrName = cshmkrNames[count].innerHTML;
      var shmkrId = cshmkrids.toString();
  
      console.log("Item #" + count + " Name: " + cProdName);

      firebase
      .database()
      .ref("orders/" + orderid)
      .set({
        userID: userID,
        orderID: orderid,
        groupOrderID: savedOrderID,
        prodId: cProdID,
        prodName: cProdName.trim(),
        prodPrice: parseInt(cProdPrice.trim()),
        prodSize: parseInt(cProdSize.trim()),
        imageLink: cImageLink.trim(),
        prodColor: cProdColor.trim(),
        prodQty: parseInt(orderQuantity.trim()),
        shoemakerName: shmkrName.trim(),
        shoemakerId: shmkrId,
        
        status: "Pending",
        orderType: "RTW"
      });
      var orderReference = firebase.database().ref().child("users/" + userID + "/cart/" + currOrderID)
      orderReference.remove();
    }
    alert("Ordered Successfully");
    location.reload();
  }
  else{
      var savedOrderID = orderID.toString();
      var orderid = orderID.toString();
      var currOrderID =  oid[productChecked].innerHTML;
      var orderQuantity = orderQtys[productChecked].innerHTML;
      var cProdID = prodIds[productChecked].innerHTML;
      var cProdName = prodNames[productChecked].innerHTML;
      var cProdPrice = prodPrices[productChecked].getAttribute("value");
      var cImageLink = imageLinks[productChecked].innerHTML;
      var cProdSize = prodSizes[productChecked].innerHTML;
      var cProdColor = prodColors[productChecked].innerHTML;
      var shmkrName = cshmkrNames[productChecked].innerHTML;
      var shmkrId = cshmkrids.toString();
  
      console.log("Item #" + productChecked + " Name: " + cProdName);
      
      firebase
       .database()
       .ref("orders/" + orderid)
       .set({
         userID: userID,
         orderID: savedOrderID,
         groupOrderID: savedOrderID,
         prodId: cProdID,
         prodName: cProdName.trim(),
         prodPrice: parseInt(cProdPrice.trim()),
         prodSize: parseInt(cProdSize.trim()),
         imageLink: cImageLink.trim(),
         prodColor: cProdColor.trim(),
         prodQty: parseInt(orderQuantity.trim()),
         shoemakerName: shmkrName.trim(),
         shoemakerId: shmkrId, 
         status: "Pending",
         orderType: "RTW"
       });
       alert("Ordered Successfully");

       var orderReference = firebase.database().ref().child("users/" + userID + "/cart/" + currOrderID)
       orderReference.remove();
       location.reload();
  }
}

submitOrder.onclick = function () {
   checkItemSelected();
};
 

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

      var address = hNo + ' ' + stName + ', ' + brgy + ', ' + city + ', ' + pCode;

      document.getElementById("txtAddress").innerHTML = address;
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
