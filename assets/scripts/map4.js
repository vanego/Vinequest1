$(document).ready(function() {



    // Default vars

    var map;
    var latitude = "";
    var longitude = "";
    var LatLng = "";
    var service;
    var infowindow;
    var marker;

    // API keys

    var googleMapapiKey = "AIzaSyCyswQe8LuGs4TY79PITYkp4v3K8YD7yfk";


    // Load location
    $(document).on("click", "#maps", getLocation);




    function getLocation() {

        x = $("#place").val();


        console.log("Place = " + x);

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition, showError);
        } else {
            x.innerHTML = "Geolocation is not supported by this browser.";
        }
    }





function createMarker(place) {
        console.log(place);
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
            map: map,
            position: placeLoc,
            animation: google.maps.Animation.DROP,
            clickable: true
        });

        console.log("Position=" + place.geometry.location);


        google.maps.event.addListener(marker, 'click', function() {
            infowindow.setContent(place.name);
            infowindow.open(map, this);
        });;
    };

function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                createMarker(results[i]);
                console.log("Results=" + results[i]);
            }
        }
    }

    function showPosition(position) {
        var latlon = position.coords.latitude + "," + position.coords.longitude;
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        var LatLng = new google.maps.LatLng(latitude, longitude);



        var map = new google.maps.Map(document.getElementById('map-canvas'), {
            center: {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            },
            zoom: 12

        })


        infowindow = new google.maps.InfoWindow();
        var service = new google.maps.places.PlacesService(map);
        service.nearbySearch({
            location: LatLng,
            radius: 109360,
            types: [x]

        }, callback);
        console.log("LatLng" + LatLng);
    };


    
    


    function showError(error) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                x.innerHTML = "User denied the request for Geolocation."
                break;
            case error.POSITION_UNAVAILABLE:
                x.innerHTML = "Location information is unavailable."
                break;
            case error.TIMEOUT:
                x.innerHTML = "The request to get user location timed out."
                break;
            case error.UNKNOWN_ERROR:
                x.innerHTML = "An unknown error occurred."
                break;
        }
    }




});