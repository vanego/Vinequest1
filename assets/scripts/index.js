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
      .then(function(user) {
        firebase
          .auth()
          .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
          .then(function() {
            return firebase.auth().signInWithEmailAndPassword(email, password);
          })
          .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
          });
        window.location = "./search.html";
      })
      .catch(function(error) {
        console.log(error.message);
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

  // Logout event
  $("#logout").on("click", e => {
    e.preventDefault();
    firebase.auth().signOut();
  });

  // Add a realtime listener
  firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
      console.log(firebaseUser);
      $("#logout").classList.remove("hide");

      // We get back a fireabseUser.uid, Save it in our databse

      database.ref("users/" + firebaseUser.uid).set({
        favorites: ["mor", "gan"]
      });
    } else {
      console.log("not logged in");
      $("#logout").classList.add("hide");
    }
  });
});
