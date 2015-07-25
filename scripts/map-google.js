var address,
    street,
    city,
    locationName,
    place,
    note;

var map, 
    geocoder;


//var allLocations = [];

$('.location:first-of-type').each(function(){
   street = $(this).find('.location-address-street').text(); 
   city = $(this).find('.location-address-city').text();
   address = street + ' ' + city;
   
   console.log(address);
});

function initialize() {
  geocoder = new google.maps.Geocoder();
  var latlng;
  var mapOptions = {
    zoom: 8,
    scrollwheel: false,
    center: latlng
  };
  
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  
    var contentString = '<div class="infowindow">'+
          //'<div>' + locationName + '</div>' +  
          '<div>TEST</div>' +  
          '</div>';
    
    var infowindow = new google.maps.InfoWindow({
          content: contentString
    });
    
    marker = new google.maps.Marker({
              position: latlng,
              map: map,
              title: "Test"
    });

    google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map,marker);
        console.log('I got clicked');
    });
}

function codeAddress() {
  address = address;
  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
        map.setCenter(results[0].geometry.location);
        marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location
      });
    } else {
      console.log('Geocode was not successful for the following reason: ' + status);
    }
  });
}

window.onload = function() {
    initialize();
    codeAddress();
};

var dom = document.getElementById("map-canvas");
dom.addEventListener('DOMMouseScroll',function(e){e.stopPropagation();},false);


$('.location-name a').click(function(){
    thisLocation = $(this).parents('.location');
    
    street = thisLocation.find('.location-address-street').text(); 
    city = thisLocation.find('.location-address-city').text();
    locationName = thisLocation.find('.location-name').text();
    place = thisLocation.find('.location-place').text();
    note = thisLocation.find('.location-note').text();
    
    console.log(locationName);
    console.log(place);
    console.log(street + ", " + city);
    
   $(this).parents('.location').addClass('is-current').siblings('.location').removeClass('is-current'); 
});