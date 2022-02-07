//alert(localStorage.getItem("userID"));
var adminUser;

var AdminLogout = document.getElementById("adminlogout");


// Check if user is logged in
firebase.auth().onAuthStateChanged(function(adminUser) {
  if (!adminUser) {
    //Redirect user to login if not logged in
    alert("Login First!");
    location.href='../index.html'; 
  }
});


firebase.database()
    .ref("users/" + localStorage.getItem("userID"))
    .on("value", function (snap) {
      userType = snap.val().accountType;
      
        document.getElementById("adminhiddenId").innerHTML = snap.val().userType;
        document.getElementById("adminhiddenId").style.display = "none";
      });

AdminLogout.onclick = function () {

  firebase.auth().signOut().then(() => {

    location.href='index.html';  
    localStorage.clear();

  }).catch((error) => {
    console.log(error);
  });
};
