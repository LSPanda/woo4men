/* Woo4men
*
* Script for my website
*
* Started @ 13/01/2015
*/

( function( $ ) {
    "user strict";

    //- Variable for my gMap
    var defaultPosition,
    mapOptions,
    gMap,
    Geocoder,
    gMarker,
    image,
    addressMag = addressMags;

    //-Function for my gMap
    function generateGoogleMap() {
        //Set position to Bruxelle
        defaultPosition = new google.maps.LatLng( 50.8504500, 4.3487800 );
        //Init mapOptions
        mapOptions = {
            center: defaultPosition,
            zoom: 15,
            disableDefaultUI: true,
            scrollwheel: false,
            draggable: false,
            mapTypeId: google.maps.MapTypeId.ROADMAPx
        };
        //Marker rendez-vous
        imageMag = {
            url: '../css/images/gMap/marker.png',
            size: new google.maps.Size( 45,60 ),
            origin: new google.maps.Point( 0,0 ),
            anchor: new google.maps.Point( 15, 60 )
        };
        //Init Geocoder
        Geocoder = new google.maps.Geocoder();
        selectedAdress();
        //Set defaultGmap
        gMap = new google.maps.Map( document.getElementById( "gmap" ), mapOptions );
    }

    function selectedAdress() {
        //Stick rendez-vous marker on gMap
        Geocoder.geocode( { 'address': addressMag}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                gMap.setCenter(results[0].geometry.location);
                gMarker = new google.maps.Marker( {
                    map: gMap,
                    position: results[0].geometry.location,
                    icon: imageMag
                } );
            }
        } );
    }

    $( function() {
        //Generate google gMap for event
        generateGoogleMap();
    } );

} ) (jQuery);
