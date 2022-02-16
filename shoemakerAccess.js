//alert(localStorage.getItem("userID"));
var shoemakerUser;

var shmkrId = localStorage.getItem("userID");

var ShoemakerLogout = document.getElementById("shmkrlogout");

//

var today = new Date();
var time = new Date().getFullYear() + "" + new Date().getMonth()  + 1 + "" + new Date().getDate()  + "" + today.getHours() + "" + today.getMinutes() + "" + today.getSeconds();

var shoeName, shoePrice, shoeDescription, storename;
var prodID_var = time;


function readAddForm() {
    shoeName = document.getElementById("addProd_ShoeName").value;
    shoePrice = document.getElementById("addProd_ShoePrice").value;
    shoeDescription = document.getElementById("addProd_ShoeDescription").value;
}



// Check if user is logged in
firebase.auth().onAuthStateChanged(function(shoemakerUser) {
  if (!shoemakerUser) {
    //Redirect user to login if not logged in
    location.href='../index.html'; 
  }
});


firebase.database()
    .ref("users/" + shmkrId)
    .on("value", function (snap) {
      userType = snap.val().accountType;
      storename = snap.val().name;
      
        document.getElementById("shmkr-name-nav").innerHTML = storename;
        document.getElementById("shmkr-name-sidenav").innerHTML = storename;
      });



ShoemakerLogout.onclick = function () {

  firebase.auth().signOut().then(() => {

    location.href='index.html';  
    localStorage.clear();

  }).catch((error) => {
    console.log(error);
  });
};

