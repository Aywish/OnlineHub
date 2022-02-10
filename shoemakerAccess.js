//alert(localStorage.getItem("userID"));
var shoemakerUser;

var shmkrId = localStorage.getItem("userID");

var ShoemakerLogout = document.getElementById("shmkrlogout");

//

var today = new Date();
var time = new Date().getFullYear() + "" + new Date().getMonth()  + 1 + "" + new Date().getDate()  + "" + today.getHours() + "" + today.getMinutes() + "" + today.getSeconds();

var shoeName, shoePrice, shoeDescription;
var prodID_var = time;


function readAddForm() {
    shoeName = document.getElementById("addProd_ShoeName").value;
    shoePrice = document.getElementById("addProd_ShoePrice").value;
    shoeDescription = document.getElementById("addProd_ShoeDescription").value;
}

//Create

// document.getElementById("btnAddProduct").onclick = function () {
//   readAddForm();
//   console.log("Add Clicked!");

//   firebase
//     .database()
//     .ref("users/" + shmkrId + "products/" + prodID_var)
//     .set({
//       shoeMakerID: shmkrId,
//       prodId: prodID_var,
//       prodName: shoeName,
//       prodPrice: parseFloat(shoePrice),
//       prodDesc: shoeDescription,
//     });
//   alert("Product Added!");
// };
// document.getElementById("btnAddProduct").onclick = function () {
//     readAddForm();
//     console.log("Add Clicked!");

//     firebase
//       .database()
//       .ref("products/" + prodID_var)
//       .set({
//         shoeMakerID: localStorage.getItem("userID"),
//         prodId: prodID_var,
//         prodName: shoeName,
//         prodPrice: parseFloat(shoePrice),
//         prodDesc: shoeDescription,
//       });
//     alert("Product Added!");
//   };

//


// Check if user is logged in
firebase.auth().onAuthStateChanged(function(shoemakerUser) {
  if (!shoemakerUser) {
    //Redirect user to login if not logged in
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

