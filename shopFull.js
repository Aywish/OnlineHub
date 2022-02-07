var product = firebase.database().ref().child("products/");

product.on("child_added", snap => {

  var prodID = snap.child("prodId").val();
  var prodPrice = snap.child("prodPrice").val();
  var prodName = snap.child("prodName").val();

  $("#content_page").append('<div class="card"><div class="product-image"><div class="product-overlay"><a href="#" class="view-product-details" onclick="">View Details</a></div><img src="images/1.jpg"></div><div class="card-content"><p class="shoe-name">' + prodName + '</p><p class="shoe-maker"> ' + prodID + '</p><p class="shoe-price"> ₱' + prodPrice +  '.00</p></div></div></div>');

  //console.log(prodID + " " + prodPrice + " " + orderTotal);

});