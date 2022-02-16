var custUser, shmkrId;

var CustLogout = document.getElementById("custlogout");


//Check if user is logged in
firebase.auth().onAuthStateChanged(function(custUser) {
  if (!custUser) {
    //Redirect user to login if not logged in
    location.href='../index.html'; 
  }
});


var product = firebase.database().ref().child("products/");

var addprodId, vwProdName, vwProdPrice;

//ID Generator YEARMONTHDAYHOURSMINUTESSECONDS
var today = new Date();
var time = new Date().getFullYear() + "" + new Date().getMonth()  + 1 + "" + new Date().getDate()  + "" + today.getHours() + "" + today.getMinutes() + "" + today.getSeconds();
var orderID = time;
var userID = localStorage.getItem("userID");
console.log(userID);

product.on("child_added", snap => {

  var prodID = snap.child("prodId").val();
  var prodPrice = snap.child("prodPrice").val();
  var prodName = snap.child("prodName").val();
  shmkrId = snap.child("shoeMakerID").val();

  firebase.database()
        .ref("users/" + shmkrId)
        .on("value", function (snap) {
          shmkrName = snap.val().name;
        

    $("#content_page").append('<div class="card"><div class="product-image"><div class="product-overlay"><a href="#" class="view-product-details" onclick="ProductPopup('+ prodID +')">View Details</a></div><img src="images/1.jpg"></div><div class="card-content"><p class="shoe-name">' + prodName + '</p><p class="shoe-maker" id="shoemaker">' + shmkrName + '</p><p class="shoe-price"> ₱' + prodPrice +  '.00</p></div></div></div>');
  });
});



function ProductPopup(id) {
  console.log("Clicked!");
  addprodId = id;
  
  firebase.database()
    .ref("products/" + id)
    .on("value", function (snap) {
      vwProdName = snap.val().prodName;
      vwProdPrice = snap.val().prodPrice;
      vwProdDesc = snap.val().prodDesc;
      
      shmkrId = snap.child("shoeMakerID").val();
      
      firebase.database()
        .ref("users/" + shmkrId)
        .on("value", function (snap) {
          shmkrName = snap.val().name;
          
          document.getElementById("shoemakerName").innerHTML = shmkrName;
        });

      //alert(user);
        document.getElementById("shoeName").innerHTML = vwProdName;
        document.getElementById("shoePrice").innerHTML = vwProdPrice;
        document.getElementById("shoeDesc").innerHTML = vwProdDesc;
        console.log(vwProdName, vwProdPrice)

      });
  

  document.getElementById("popup_product").style.display = "block";
  document.getElementById("bgoverlay").style.display = "block";
}



function ClosePopup() {
  document.getElementById("popup_product").style.display = "none";
  document.getElementById("bgoverlay").style.display = "none";
}



addToCart.onclick = function () {

  var cProdName = vwProdName;
  var cProdPrice = vwProdPrice;
  var cProdDesc = vwProdDesc;
  var orderid = orderID.toString() + addprodId;
  console.log(orderid, cProdName, cProdPrice, addprodId);

  firebase
  .database()
  .ref("users/" + userID + "/cart/" + orderID.toString())
  .set({
    userID: userID,
    orderID: orderid,
    prodId: addprodId,
    prodName: cProdName,
    prodDesc: cProdDesc,
    prodPrice: cProdPrice,
    shoemakerName: shmkrName
  });
  alert("Product added to cart");
};


function showCart() {


  var x = document.getElementById("showCart");
  if (x.style.display === "none") {
      x.style.display = "unset";

      var cartReference = firebase.database().ref().child("users/" + userID + "/cart/");

      cartReference.on("child_added", snap => {
        var cProdName = snap.child("prodName").val();
        var cProdPrice = snap.child("prodPrice").val();
        var cshmkrName = snap.child("shoemakerName").val();

      
        $("#cart-content").append('<tr><td><img class="cart-image" src="images/1.jpg"></td><td><p class="cart-shoename cart-col2" id="cartShoeName">' + cProdName + '</p><p class="cart-shoemaker cart-col2">' + cshmkrName + '</p></td><td><p class="cart-price" id="cartShoePrice">'+ cProdPrice +'</p></td></tr>');
        
  
      document.getElementById("prodHiddenId").innerHTML = addprodId;
      document.getElementById("prodHiddenId").style.display = "none";      
      });

  } else {
      x.style.display = "none";
      $("#cart-content").html("");
  }
}


addToFullCart.onclick = function () {


  var cartReference = firebase.database().ref().child("users/" + userID + "/cart/");
  cartReference.on("child_added", snap => {
    
    var cProdName = snap.child("prodName").val();
    var cProdPrice = snap.child("prodPrice").val();
    var cshmkrName = snap.child("shoemakerName").val();

    $("cart-items").append('<tr><td class="checkbox"><input type="checkbox" name=""></td><td><img class="product-image" src="images/1.jpg"></td><td class="prod-details"><p class="shoename cart-col2">'+ cProdName +'</p><p class="shoemaker cart-col2">' + cshmkrName + '</p></td><td><table class="specs"><tr class="spec-row"><td class="spec-title">Color: </td><td class="spec-value">White</td></tr><tr class="spec-row"><td class="spec-title">Size: </td><td class="spec-value">39</td></tr><tr class="spec-row"><td class="spec-title">Qty: </td><td class="spec-value">1</td></tr></table></td><td><p class="price">' + cProdPrice + '</p></td></tr>');
    
    document.getElementById("prodHiddenId").innerHTML = addprodId;
    document.getElementById("prodHiddenId").style.display = "none";   
  });
};



firebase.database()
    .ref("users/" + userID)
    .on("value", function (snap) {
      userType = snap.val().accountType;
      username = snap.val().userName;
      
      //alert(user);
        document.getElementById("custhiddenId").innerHTML = snap.val().userType;
        document.getElementById("custhiddenId").style.display = "none";
        console.log(userType)

        customOrderNav.onclick = function () {
          if (userType == "user") {
            location.href='./CustomerProfile.html'; 
          }
          else{
            location.href='./ShoemakerAccess.html'; 
          }
        };
      });

  
  
      $(document).ready(function(){
        $('.shmkr1').click(function(){
            $("#check").prop("checked", true);
            $('#content_page').load('includes/tatayolyprofilePUBLIC.html');
            $('.selector').removeClass('selected')
            $('.home_selector').toggleClass('selected')
        });
      });

      $(document).ready(function(){
        $('.shmkr2').click(function(){
            $("#check").prop("checked", true);
            $('#content_page').load('includes/inchesfootwearprofilePUBLIC.html');
            $('.selector').removeClass('selected')
            $('.home_selector').toggleClass('selected')
        });
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
      