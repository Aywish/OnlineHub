//#region Initializations

var CustLogout = document.getElementById("custlogout");
var submitOrder = document.getElementById("addtocart");

var firstname, lastname, fullname, email, contact;
var upperLeatherColor, shoeLaceColor, eyeletColor, outSoleColor, threadColor, orderQuantity;

var selectedShoemakerID = localStorage.getItem("shoemakerID");
var shmkrName;

//#endregion

//alert(localStorage.getItem("shoemakerID"));

//#region ID Generator YEARMONTHDAYHOURSMINUTESSECONDS
var today = new Date();
var time = new Date().getFullYear() + "" + new Date().getMonth()  + 1 + "" + new Date().getDate()  + "" + today.getHours() + "" + today.getMinutes() + "" + today.getSeconds();
var orderID = time;
var userID = localStorage.getItem("userID");

//#endregion

//Get Shoemaker Name based on selectedShoeMakerID
firebase.database()
  .ref("users/" + selectedShoemakerID)
  .on("value", function (snap) {
    shmkrName = snap.val().storeName;
  });

//Get User info
firebase.database()
.ref("users/" + userID)
.on("value", function (snap) {
  firstname = snap.val().firstName;
  lastname = snap.val().lastName;
  email = snap.val().email;
  contact = snap.val().contactNo;
  fullname = firstname + " " + lastname;
});

var custUser = localStorage.getItem("userID");
var userType;

//Check if user is logged in
firebase.auth().onAuthStateChanged(function(custUser) {
  if (!custUser) {
    //Redirect user to login if not logged in
    alert("Can't access, please login first");
    location.href='../index.html'; 
  }
});

//Read Customized Data
function readCustomizedData() {
  upperLeatherColor = document.getElementById("finalUL").innerHTML;
  shoeLaceColor = document.getElementById("finalSL").innerHTML;
  eyeletColor = document.getElementById("finalEL").innerHTML;
  outSoleColor = document.getElementById("finalOS").innerHTML;
  threadColor = document.getElementById("finalTH").innerHTML;
  orderQuantity = document.getElementById("quantity").value;
  // alert(upperLeatherColor + shoeLaceColor + eyeletColor + outSoleColor + threadColor + " qty: " + orderQuantity);
}


//Idk
firebase.database()
  .ref("users/" + custUser)
  .on("value", function (snap) {
    userType = snap.val().accountType;
    username = snap.val().userName;
    
    //alert(user);
      document.getElementById("custhiddenId").innerHTML = snap.val().userType;
      document.getElementById("custhiddenId").style.display = "none";
      

      customOrderNav.onclick = function () {
        if (userType == "user") {
          location.href='./CustomerProfile.html'; 
        }
        else{
          location.href='./ShoemakerAccess.html'; 
        }
      };

  });

//Submit Order Onclick Handler
submitOrder.onclick = function () {

  readCustomizedData();

  var cProdName = "Order Custom";
  var cProdPrice = 0;
  var cProdDesc = "Order Custom";
  var orderid = orderID.toString();
  var cProdType = "Topsider";
  console.log(orderid, cProdName, cProdPrice, cProdDesc);

  firebase
  .database()
  .ref("users/" + selectedShoemakerID + "/orders/" + orderID.toString())
  .set({
      custID: userID,
      custName: fullname,
      custEmail: email, 
      custContactNum: contact,
      prodId: orderid,
      prodName: cProdName,
      prodPrice: cProdPrice,
      prodDesc: cProdDesc,
      prodType: cProdType,
      prodQuantity: orderQuantity,
      prodCustom_UpperLeather: upperLeatherColor,
      prodCustom_ShoeLace: shoeLaceColor,
      prodCustom_OutSole: outSoleColor, 
      prodCustom_Thread: threadColor,
      prodCustom_Eyelet: eyeletColor
  });
  //location.reload();

  //Add To Customer's Own Collection
  // firebase
  // .database()
  // .ref("users/" + userID + "/cart/" + orderID.toString())
  // .set({
  //   userID: userID,
  //   orderID: orderid,
  //   prodId: orderid,
  //   prodName: cProdName,
  //   prodDesc: cProdDesc,
  //   prodPrice: cProdPrice,
  //   shoemakerName: shmkrName
  // });
  alert("Order Submitted. Pending for review.");
  
};

CustLogout.onclick = function () {

    firebase.auth().signOut().then(() => {
  
      location.href='index.html';  
      localStorage.clear();
  
    }).catch((error) => {
      console.log(error);
      // An error happened.
    });
  };