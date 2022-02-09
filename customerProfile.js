//alert(localStorage.getItem("userID"));
var custUser;

var CustLogout = document.getElementById("custlogout");


//Check if user is logged in
firebase.auth().onAuthStateChanged(function(custUser) {
  if (!custUser) {
    //Redirect user to login if not logged in
    location.href='../index.html'; 
  }
});


firebase.database()
    .ref("users/" + localStorage.getItem("userID"))
    .on("value", function (snap) {
      userType = snap.val().accountType;
      username = snap.val().userName;
      
      //alert(user);
        document.getElementById("custhiddenId").innerHTML = snap.val().userType;
        document.getElementById("custhiddenId").style.display = "none";

        document.getElementById("snCustUserName").innerHTML = snap.val().username;
        document.getElementById("tnCustUserName").innerHTML = snap.val().username;
        document.getElementById("titleCustUserName").innerHTML = snap.val().username;
        console.log(userType)
      });


      // EDIT FOR CUSTOMER UPDATE
      // document.getElementById("update").onclick = function () {
      //   readCrudForm();
      
      //   firebase
      //     .database()
      //     .ref("products/" + prodId_var)
      //     .update({
      //       //   prodId: rollV,
      //       prodName: name_var,
      //       prodPrice: parseFloat(price_var),
      //       prodStock: parseInt(stock_var),
      //     });
      //   alert("Data Update");
      //   document.getElementById("prodID").value = "";
      //   document.getElementById("prodName").value = "";
      //   document.getElementById("prodPrice").value = "";
      //   document.getElementById("prodStock").value = "";
      // };


CustLogout.onclick = function () {

  firebase.auth().signOut().then(() => {

    location.href='index.html';  
    localStorage.clear();

  }).catch((error) => {
    console.log(error);
    // An error happened.
  });
};
