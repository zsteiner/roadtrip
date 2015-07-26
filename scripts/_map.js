var address,
    street,
    city,
    locationName,
    place,
    note,
    image;

var map,
    marker, 
    geocoder,
    lat,
    lng;

$('.location:first-of-type').each(function(){
    street = $(this).find('.location-address-street').text(); 
    city = $(this).find('.location-address-city').text();
    address = street + ' ' + city;
    locationName = $(this).find('.location-name').text();
    place = $(this).find('.location-place').text();
    note = $(this).find('.location-note').text();
    image = $(this).find('.location-image').text();
    
    console.log(address);
    
    $(this).next('.location').addClass('is-current');
    $(this).remove();
});

function showMap(err, data) {
  var zoomLevel = 11;
  
    if(address ==="") {
        map.setView([lat, lng], zoomLevel);
    }

    else {
        lat = data.latlng[0];
        lng = data.latlng[1];        
    
        map.setView([data.latlng[0], data.latlng[1]], zoomLevel);
    }    

    marker = L.marker([lat, lng], {
      icon: L.mapbox.marker.icon({
        'marker-color': '#9c89cc'
      })
    })
    .bindPopup('<div class="location-info-popup">' +
    '<header class="info-popup-header"><img src="images/info-images/' + image + '.jpg">' +
    '<div class="header-container">' + 
    '<h1>' + locationName + '</h1>' +
    '<h2>' + place + '</h2>' + 
    '</div>' +
    '</header>' +
    '<div class="location-address">' +
    '<div>' + address + '</div>' + 
    '</div>' +
    '<div class="location-note">' + note + '</div>' +
    '</div>').addTo(map).openPopup();
}

L.mapbox.accessToken = 'pk.eyJ1IjoienN0ZWluZXIiLCJhIjoiTXR4U0tyayJ9.6BxBAjPyMHbt1YfD5HWGXA';
    geocoder = L.mapbox.geocoder('mapbox.places');
    map = L.mapbox.map('map-canvas', 'mapbox.outdoors');

geocoder.query(address, showMap);    

$('.location-name a').click(function(){
    thisLocation = $(this).parents('.location');
    
    street = thisLocation.find('.location-address-street').text(); 
    city = thisLocation.find('.location-address-city').text();
    locationName = thisLocation.find('.location-name').text();
    lat = thisLocation.find('.location-address-lat').text();
    lng = thisLocation.find('.location-address-lng').text();
    place = thisLocation.find('.location-place').text();
    note = thisLocation.find('.location-note').text();
    image = thisLocation.find('.location-image').text();

    if(street === "") {
        address = city;
    }
    
    else {
        address = street + ', ' + city;
    }
    
    console.log(locationName);
    //console.log(place);
    console.log(address);
    
   $(this).parents('.location').addClass('is-current').siblings('.location').removeClass('is-current'); 
   
    geocoder.query(address, showMap);
    
    $('.menu-button').click();    
});