var CustLogout = document.getElementById("custlogout");

alert(localStorage.getItem("shoemakerID"));

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


var upperLeatherColor, shoeLaceColor, eyeletColor, outSoleColor, threadColor;

var upperLeather, shoeLace, eyeLet, outSole, thread;

upperLeather = document.getElementsByClassName("upperLeather");
shoeLace = document.getElementsByClassName("shoelace");
eyeLet = document.getElementById("eyelet");
outSole = document.getElementsByClassName("outsole");
thread = document.getElementsByClassName("thread");

function setUpperLeatherColor(val) {
    upperLeatherColor = val;
    if(val == "ULcolor1"){
        document.getElementsByClassName("upperLeather").src = "./images/1.jpg" ;
        console.log(val);
    }
}

function setShoeLaceColor(val) {
    shoeLaceColor = val;
    console.log(val)
}

function setEyeletColor(val) {
    eyeletColor = val;
    console.log(val)
}

function setOutSoleColor(val) {
    outSoleColor = val;
    console.log(val)
}

function setThreadColor(val) {
    threadColor = val;
    console.log(val)
}





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



CustLogout.onclick = function () {

    firebase.auth().signOut().then(() => {
  
      location.href='index.html';  
      localStorage.clear();
  
    }).catch((error) => {
      console.log(error);
      // An error happened.
    });
  };