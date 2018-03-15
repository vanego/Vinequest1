$(document).ready(function() {
  // Create a variable to reference the database.
  var database = firebase.database();

  // Add login event
  $("#sign-in-button").on("click", function(event) {
    event.preventDefault();

    // Sign in
    var email = $("#email").val();
    var password = $("#password-input").val();

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
      });
  });

  // Add signup event
  $("#signup").on("click", e => {
    e.preventDefault();
    var email = $("#signup-email").val();
    var password = $("#signup-password").val();
    // Get  FB authentication
    auth = firebase.auth();
    // Sign In
    promise = auth.createUserWithEmailAndPassword(email, password);
    promise.catch(e => console.log(e.message));
  });

  // Add a realtime listener
  firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
      database
        .ref("/" + firebaseUser.uid + "/liked_images")
        .on("value", function(snap) {
          if (snap.val() !== null) {
            window.location = "./favorites.html";
          } else {
            window.location = "./search.html";
          }
        });
    }
  });
});
