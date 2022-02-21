//alert(localStorage.getItem("userID"));
var custUser;
var userID = localStorage.getItem("userID");

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


      // RETRIEVE IMAGE FROM FIREBASE
      firebase.database()
      .ref("users/" + userID + "/profilePicture/" + userID)
      .on("value", function (snap) {
        document.getElementById('profilePicture').src = snap.val().imageLink;
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
