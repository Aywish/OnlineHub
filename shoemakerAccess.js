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





ShoemakerLogout.onclick = function () {

  firebase.auth().signOut().then(() => {

    location.href='index.html';  
    localStorage.clear();

  }).catch((error) => {
    console.log(error);
  });
};

