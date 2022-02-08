//alert(localStorage.getItem("userID"));
var shoemakerUser;

var ShoemakerLogout = document.getElementById("shmkrlogout");


// Check if user is logged in
firebase.auth().onAuthStateChanged(function(shoemakerUser) {
  if (!shoemakerUser) {
    //Redirect user to login if not logged in
    alert("Login First!");
    location.href='../index.html'; 
  }
});


firebase.database()
    .ref("users/" + localStorage.getItem("userID"))
    .on("value", function (snap) {
      userType = snap.val().accountType;
      console.log(userType)
      
        document.getElementById("shmkrhiddenId").innerHTML = snap.val().userType;
        document.getElementById("shmkrhiddenId").style.display = "none";
      });


      // addToCart.onclick = function () {
      //   firebase.database()
      //     .ref("products/" + addprodId)
      //     .on("value", function (snap) {
      //       var cProdName = snap.val().prodName;
      //       var cProdPrice = snap.val().prodPrice;
      
      //       $("#cart-content").append('<tr><td><img class="cart-image" src="images/1.jpg"></td><td><p class="cart-shoename cart-col2" id="cartShoeName">' + cProdName + '</p><p class="cart-shoemaker cart-col2">Shoemaker Name</p></td><td><p class="cart-price" id="cartShoePrice">'+ cProdPrice +'</p></td></tr>');
      
        
      //       document.getElementById("prodHiddenId").innerHTML = id;
      //       document.getElementById("prodHiddenId").style.display = "none";
      //       });
      // };



ShoemakerLogout.onclick = function () {

  firebase.auth().signOut().then(() => {

    location.href='index.html';  
    localStorage.clear();

  }).catch((error) => {
    console.log(error);
  });
};

