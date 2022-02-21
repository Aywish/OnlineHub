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
.ref("adminProducts/" + 1)
.on("value", function (snap) {
  var showHeadline = snap.val().prodHeadline;
  var showDesc = snap.val().shortDescription;
  var link = snap.val().prodLink;

  document.getElementById('image1').src = snap.val().imageLink;
  document.getElementById('headline1').innerHTML = showHeadline;
  document.getElementById('desc1').innerHTML = showDesc;
  document.getElementById('link1').href = link;
});

firebase.database()
.ref("adminProducts/" + 2)
.on("value", function (snap) {
  var showHeadline = snap.val().prodHeadline;
  var showDesc = snap.val().shortDescription;

  document.getElementById('image2').src = snap.val().imageLink;
  document.getElementById('headline2').innerHTML = showHeadline;
  document.getElementById('desc2').innerHTML = showDesc;
});

firebase.database()
.ref("adminProducts/" + 3)
.on("value", function (snap) {
  var showHeadline = snap.val().prodHeadline;
  var showDesc = snap.val().shortDescription;

  document.getElementById('image3').src = snap.val().imageLink;
  document.getElementById('headline3').innerHTML = showHeadline;
  document.getElementById('desc3').innerHTML = showDesc;
});

firebase.database()
.ref("adminProducts/" + 4)
.on("value", function (snap) {
  var showHeadline = snap.val().prodHeadline;
  var showDesc = snap.val().shortDescription;

  document.getElementById('image4').src = snap.val().imageLink;
  document.getElementById('headline4').innerHTML = showHeadline;
  document.getElementById('desc4').innerHTML = showDesc;
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
