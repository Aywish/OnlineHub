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

orderCustom.onclick = function () {
  warning = "Order Custom is only available for wholesale orders with no less than 300 pair of shoes. \n\nWould you like to proceed?";

      if (confirm(warning) == true) {
          location.href='./OrderCustom.html#t4'; 
      } else {
          alert("You cancelled!");
      }
};


firebase.database()
    .ref("users/" + localStorage.getItem("userID"))
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



CustLogout.onclick = function () {

  firebase.auth().signOut().then(() => {

    location.href='index.html';  
    localStorage.clear();

  }).catch((error) => {
    console.log(error);
    // An error happened.
  });
};
