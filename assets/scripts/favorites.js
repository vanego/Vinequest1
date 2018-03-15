$(document).ready(function() {
  //   if (firebase.auth().currentUser === null) {
  //     //window.location redirects user to given page
  //     window.location = "./index.html";
  //   }

  var database = firebase.database();

  var userId = firebase.auth().currentUser.uid;
  var likedImages = [];
  database.ref("/" + userId + "/liked_images").on("value", function(snap) {
    if (snap.val() !== null) {
      likedImages = snap.val();
      console.log(likedImages);

      for (var favorites = 0; favorites < likedImages.length; favorites++) {
        var image = likedImages[favorites];
        console.log(image);

        var container = $(
          `<div data-image=${image} style="background: url(${image}); height: 265px; width: 400px; display:inline-block;"></div>`
        );
        // var imgId = ;

        container.addClass("imageresults");

        $("#dump-favs-here").prepend(container);
      }
    } else {
      var placeholder = $(`<div><p>You haven't liked any images</p></div>`);
      $("#dump-favs-here").append(placeholder);
    }
  });
});
