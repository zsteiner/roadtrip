var address,
    street,
    city,
    locationName,
    place,
    note;

var map,
    marker, 
    geocoder,
    lat,
    lng;

//var allLocations = [];


$('.location:first-of-type').each(function(){
    street = $(this).find('.location-address-street').text(); 
    city = $(this).find('.location-address-city').text();
    address = street + ' ' + city;
    locationName = $(this).find('.location-name').text();
    place = $(this).find('.location-place').text();
    note = $(this).find('.location-note').text();
    
    console.log(address);
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
    
    marker = L.mapbox.featureLayer({
        // this feature is in the GeoJSON format: see geojson.org for the full specification
        type: 'Feature',
        geometry: {
            type: 'Point',
            // coordinates here are in longitude, latitude order because x, y is the standard for GeoJSON and many formats
            coordinates: [
              lng,
              lat
            ]
        },
        properties: {
            title: locationName + ", " + place,
            description: note,
            // one can customize markers by adding simplestyle properties 
            // https://www.mapbox.com/guides/an-open-platform/#simplestyle
            'marker-size': 'small',
            'marker-color': '#4A90E2',
        }
    }).addTo(map).openPopup();
}

L.mapbox.accessToken = 'pk.eyJ1IjoienN0ZWluZXIiLCJhIjoiTXR4U0tyayJ9.6BxBAjPyMHbt1YfD5HWGXA';
    geocoder = L.mapbox.geocoder('mapbox.places');
    map = L.mapbox.map('map-canvas', 'examples.map-h67hf2ic');

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