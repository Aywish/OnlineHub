
// VARIABLES FOR LOGGING-IN
var loginEmail, loginPassword;

// VARIABLES FOR LOGGING-IN
var signupUname, signupFname, signupLname, signupAddress, signupContact, signupEmail, signupPassword;

// VARIABLE SIGNUP DEFAULT VALUE

var signup = false;

var provider = new firebase.auth.GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

// firebase.auth().onAuthStateChanged(function(user) {
//   if(!signup){
//     if(user) {
//       location.href = "index.html";
//     }
//   }
// });


//Input Getters Start

function readLoginForm() {
  loginEmail = document.getElementById("login-email").value;
  loginPassword = document.getElementById("login-password").value;
};

function readSignupForm() {
  signupUname = document.getElementById("signup-uname").value;
  signupFname = document.getElementById("signup-fname").value;
  signupLname = document.getElementById("signup-lname").value;
  signupAddress = document.getElementById("signup-address").value;
  signupContact = document.getElementById("signup-contact").value;
  signupEmail = document.getElementById("signup-email").value;
  signupPassword = document.getElementById("signup-password").value;
};

function clearInput(id) {
  document.getElementById(id).value = "";
};



//Login 
document.getElementById("custLogin").onclick = function () {
  console.log("Login Clicked");
  readLoginForm();
  
  firebase.auth().signInWithEmailAndPassword(loginEmail, loginPassword)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    var id = user.uid;

    firebase.database()
    .ref("users/" + id)
    .on("value", function (snap) {
      accesstype = snap.val().accountType;
      console.log(accesstype)
      if(accesstype == "admin"){
        location.href='AdminAccess.html';
      }
      else{
        if(accesstype == "shoemaker"){
          location.href='ShoemakerAccess.html';
        }
        else{
          if(user) {
            alert("You are logged In!");
            location.href = "CustomerProfile.html";
          }
        }
      }
    });

    
    //Pass Data
    localStorage.setItem("userID", id);
    
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    alert("Error! - " + errorMessage + "\nError Code: " + errorCode);
  });

};

//Signup 
document.getElementById("custSignup").onclick = function () {
  signup = true;
  readSignupForm();

  firebase.auth().createUserWithEmailAndPassword(signupEmail, signupPassword)
  .then((userCredential) => {
    // Signed up 
    var user = userCredential.user;
    console.log(user.uid);
    firebase
    .database()
    .ref("users/" + user.uid)
    .set({
      uid: user.uid,
      username: signupUname,
      firstName: signupFname,
      lastName: signupLname,
      address: signupAddress,
      contactNo: signupContact,
      email: signupEmail,
      accountType: "user"
    });

    alert("Sign up Success!" + "\n\n"+ signupEmail + "\n" + signupPassword + "\nUser ID: " + user.uid);

  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    alert("Error! - " + errorMessage + "\nError Code: " + errorCode);
  });

  
  clearInput("signup-uname");
  clearInput("signup-fname");
  clearInput('signup-lname');
  clearInput("signup-address");
  clearInput('signup-contact');
  clearInput("signup-email");
  clearInput('signup-password');
};


//Google Login

document.getElementById("custgoogleLogin").onclick = function () {
  firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;

    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...

    firebase.database()
    .ref("users/" + id)
    .on("value", function (snap) {
      accesstype = snap.val().accountType;
      console.log(accesstype)
      if(accesstype == "admin"){
        location.href='AdminAccess.html';
      }
      else{
        if(accesstype == "shoemaker"){
          location.href='ShoemakerAccess.html';
        }
        else{
          if(user) {
            alert("You are logged In!");
            location.href = "CustomerProfile.html";
          }
        }
      }
    });
    
    
    localStorage.setItem("userID", user.uid);
    
  }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    alert("Error! - " + email + "\n"+ errorMessage + "\nError Code: " + errorCode + "\n" + credential);

  });
}

document.getElementById("custgoogleSignup").onclick = function () {
  signup = true;
  firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;

    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
    firebase
    .database()
    .ref("users/" + user.uid)
    .set({
      email: user.email,
      accountType: "user"

    });
    alert("Sign up Success!" + "\n\n"+ user.email + "\nUser ID: " + user.uid);

    firebase.auth().signOut().then(() => {
      localStorage.clear();
    }).catch((error) => {
      console.log(error);
    })
  }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    alert("Error! - " + email + "\n"+ errorMessage + "\nError Code: " + errorCode + "\n" + credential);

  });

 
}

