var custUser, shmkrId;

var addprodId, vwProdName, vwProdPrice, vwProdSize, vwProdColor;

var CustLogout = document.getElementById("custlogout");
var userID = localStorage.getItem("userID");


//Check if user is logged in
firebase.auth().onAuthStateChanged(function(custUser) {
  if (!custUser) {
    //Redirect user to login if not logged in
    alert("Can't access, please login first");
    location.href='../index.html'; 
  }
});




//#region show products from database
var product = firebase.database().ref().child("products/");

product.on("child_added", snap => {

  var prodID = snap.child("prodId").val();
  var prodPrice = snap.child("prodPrice").val();
  var prodName = snap.child("prodName").val();
  shmkrId = snap.child("shoeMakerID").val();

  firebase.database()
        .ref("users/" + shmkrId)
        .on("value", function (snap) {
          shmkrName = snap.val().storeName;
        

    $("#content_page").append('<div class="card"><div class="product-image"><div class="product-overlay"><a href="#" class="view-product-details" onclick="ProductPopup('+ prodID +')">View Details</a></div><img src="images/1.jpg"></div><div class="card-content"><p class="shoe-name">' + prodName + '</p><p class="shoe-maker" id="shoemaker">' + shmkrName + '</p><p class="shoe-price"> ₱' + prodPrice +  '.00</p></div></div></div>');
  });
});

//#endregion


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
          shmkrName = snap.val().storeName;
          
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
  
  //#region ID Generator YEARMONTHDAYHOURSMINUTESSECONDS
  var today = new Date();
  var time = new Date().getFullYear() + "" + new Date().getMonth()  + 1 + "" + new Date().getDate()  + "" + today.getHours() + "" + today.getMinutes() + "" + today.getSeconds();
  var orderID = time;

  //#endregion
  
  var orderid = orderID.toString();

  var cProdName = vwProdName;
  var cProdPrice = vwProdPrice;
  var cProdDesc = vwProdDesc;
  var cProdSize = vwProdSize; 
  var cProdColor = vwProdColor;
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
    prodSize: cProdSize,
    prodColor: cProdColor,
    shoemakerName: shmkrName
  });
  alert("Product added to cart");
};

//#region Color Selector

$(document).ready(function(){
  $('#color1').click(function(){
      vwProdColor = "Brown";
      console.log("Color Selected: " + vwProdColor);
  });
});

$(document).ready(function(){
  $('#color2').click(function(){
      vwProdColor = "Black";
      console.log("Color Selected: " + vwProdColor);
  });
});

$(document).ready(function(){
  $('#color3').click(function(){
      vwProdColor = "Tan";
      console.log("Color Selected: " + vwProdColor);
  });
});

$(document).ready(function(){
  $('#color4').click(function(){
      vwProdColor = "White";
      console.log("Color Selected: " + vwProdColor);
  });
});

//#endregion

//#region Size Selector

$(document).ready(function(){
  $('#sizeA').click(function(){
      vwProdSize = 5;
      // console.log("Size Selected: " + vwProdSize);
  });
});

$(document).ready(function(){
  $('#sizeB').click(function(){
      vwProdSize = 6;
      console.log("Size Selected: " + vwProdSize);
  });
});

$(document).ready(function(){
  $('#sizeC').click(function(){
      vwProdSize = 7;
      console.log("Size Selected: " + vwProdSize);
  });
});

$(document).ready(function(){
  $('#sizeD').click(function(){
      vwProdSize = 8;
      console.log("Size Selected: " + vwProdSize);
  });
});

$(document).ready(function(){
  $('#sizeE').click(function(){
      vwProdSize = 9;
      console.log("Size Selected: " + vwProdSize);
  });
});

//#endregion

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


//#region Including Pages
  
$(document).ready(function(){
  $('.shmkr1').click(function(){
      $("#check").prop("checked", true);
      $('#content_page').load('includes/tatayolyprofilePUBLIC.html');
      $('.selector').removeClass('selected')
      $('.shmkr1').toggleClass('selected')
  });
});

$(document).ready(function(){
  $('.shmkr2').click(function(){
      $("#check").prop("checked", true);
      $('#content_page').load('includes/inchesfootwearprofilePUBLIC.html');
      $('.selector').removeClass('selected')
      $('.shmkr2').toggleClass('selected')
  });
});

$(document).ready(function(){
  $('.category1').click(function(){
      $("#check").prop("checked", true);
      $('#content_page').load('includes/category1.html');
      $('.selector').removeClass('selected')
      $('.category1').toggleClass('selected')
  });
});

$(document).ready(function(){
  $('.category2').click(function(){
      $("#check").prop("checked", true);
      $('#content_page').load('includes/category2.html');
      $('.selector').removeClass('selected')
      $('.category2').toggleClass('selected')
  });
});

$(document).ready(function(){
  $('.category3').click(function(){
      $("#check").prop("checked", true);
      $('#content_page').load('includes/category3.html');
      $('.selector').removeClass('selected')
      $('.category3').toggleClass('selected')
  });
});

$(document).ready(function(){
  $('.category4').click(function(){
      $("#check").prop("checked", true);
      $('#content_page').load('includes/category4.html');
      $('.selector').removeClass('selected')
      $('.category4').toggleClass('selected')
  });
});

$(document).ready(function(){
  $('.category5').click(function(){
      $("#check").prop("checked", true);
      $('#content_page').load('includes/category5.html');
      $('.selector').removeClass('selected')
      $('.category5').toggleClass('selected')
  });
});

$(document).ready(function(){
  $('.category6').click(function(){
      $("#check").prop("checked", true);
      $('#content_page').load('includes/category6.html');
      $('.selector').removeClass('selected')
      $('.category6').toggleClass('selected')
  });
});

//#endregion

CustLogout.onclick = function () {

  firebase.auth().signOut().then(() => {

    location.href='index.html';  
    localStorage.clear();

  }).catch((error) => {
    console.log(error);
    // An error happened.
  });
};
      