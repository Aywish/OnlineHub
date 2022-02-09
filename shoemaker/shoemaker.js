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
document.getElementById("btnAddProduct").onclick = function () {
    readAddForm();
    console.log("Add Clicked!");

    firebase
      .database()
      .ref("products/" + prodID_var)
      .set({
        shoeMakerID: localStorage.getItem("userID"),
        prodId: prodID_var,
        prodName: shoeName,
        prodPrice: parseFloat(shoePrice),
        prodDesc: shoeDescription,
      });
    alert("Product Added!");
  };