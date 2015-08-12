var tripName, 
    tripType, 
    tripStartDate, 
    tripEndDate,
    map,
    currentStop = 1,
    totalStops = 0;

//blank GEOJSON object with no features
var blankTrip = {
            "type": "FeatureCollection",
            "tripName": "My New Trip",
            "tripType": "city",
            "tripStartDate": "",
            "tripEndDate": "",        
        
            "features": []
        };

var tripObj = blankTrip;

//Build timeline items for stops
function createTimeline(stopID, stopDate, stopTitle, stopPlace) {
    var stopList = document.getElementById('stop-list');
        item = stopList.appendChild(document.createElement('li'));
        
    $('#sidebar').addClass('timeline');
    
    item.innerHTML = 
      '<div class="location-date"><span class="location-id" data-stop-id="'+ stopID + '">Stop #' + stopID + '</span>' + 
          '<span class="stop-date">'+ stopDate + '</span></div>' +
        '<div class="location-name"><a>' + stopTitle + '</a></div>' +
        '<div class="location-place">' + stopPlace + '</div>';

    $(item).addClass('location');
    scrollSidebar.refresh();
}

//Read in data from obj and loop through to create stops on trip
function buildSidebar(tripObj) {
    $.each(tripObj.features, function(i) {
        var thisStop = tripObj.features[i];
        
        stopID = i + 1;
        stopTitle = thisStop.properties.title;
        stopPlace = thisStop.properties.place;
        stopDate = thisStop.properties.date;

        createTimeline(stopID, stopDate, stopTitle, stopPlace);        
    });
}

//Populate main trip information with object
function updateMain() {
    tripName = tripObj.tripName;
    tripType = tripObj.tripType; 
    tripStartDate = tripObj.tripStartDate;
    tripEndDate = tripObj.tripEndDate;
    
    $('#trip-name').text(tripName);
    $('#trip-date-start').text(tripStartDate);
    $('#trip-date-end').text(tripEndDate);

    $('#input-trip-name').val(tripName);
    $('#input-trip-start').val(tripStartDate);
    $('#input-trip-end').val(tripEndDate);
}

function checkLocalStorage() {   
    tripObj = localStorage.getItem('tripObj');
    tripObj = JSON.parse(tripObj);
    
   if ($.isEmptyObject(tripObj)) {
        tripObj = blankTrip;        
   }
   
   else {
        totalStops = tripObj.features.length;
        
        buildSidebar(tripObj);
        updateMain();       
   }   
}

//Update Download Link
function downloadLink() {
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(tripObj));
    var downloadButton = document.getElementById('button-download');
    
    downloadButton.setAttribute("href", dataStr);
    downloadButton.setAttribute("download", "trip.json");    
}

//Store trip object in local storage as JSON 
function storeLocal() {
    localStorage.setItem('tripObj', JSON.stringify(tripObj));
    downloadLink();
}

//Generate Google Maps for geotagging
function createMap() {
  var mapOptions = {
    center: new google.maps.LatLng(39.8282, -98.5795),
    scrollwheel: false,
    zoom: 4
  };
    
    map = new google.maps.Map(document.getElementById('map-canvas'),
    mapOptions);

  var input = /** @type {HTMLInputElement} */(
      document.getElementById('input-stop-search'));

  var autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.bindTo('bounds', map);

  var infowindow = new google.maps.InfoWindow();
  var marker = new google.maps.Marker({
    map: map,
    anchorPoint: new google.maps.Point(0, -29)
  });

  google.maps.event.addListener(autocomplete, 'place_changed', function() {
    infowindow.close();
    marker.setVisible(false);
    var place = autocomplete.getPlace();
    if (!place.geometry) {
      window.alert("Autocomplete's returned place contains no geometry");
      return;
    }

    // If the place has a geometry, then present it on a map.
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);  // Why 17? Because it looks good.
    }

    marker.setPosition(place.geometry.location);
    marker.setVisible(true);

    var address = '';
    if (place.address_components) {
      address = [
        (place.address_components[0] && place.address_components[0].short_name || ''),
        (place.address_components[1] && place.address_components[1].short_name || ''),
        (place.address_components[2] && place.address_components[2].short_name || '')
      ].join(' ');
    }

    infowindow.setContent('<div class="g-popup"><div class="g-popup-header">' + place.name + '</div>' + address);
    infowindow.open(map, marker);

    var stopLat = place.geometry.location.lat();
    var stopLon = place.geometry.location.lng();

    var formatAddress = place.formatted_address.split(', ', 3);
    
    var stopStreet = formatAddress[0];
    var stopCity = formatAddress[1] + ', ' + formatAddress[2];
    
    $('#input-stop-lat').val(stopLat);
    $('#input-stop-lon').val(stopLon);

    $('#input-stop-street').val(stopStreet);
    $('#input-stop-city').val(stopCity);
  });  
}

//Lookup for reverse geotagging from lat and long
function geocodeLatLng(geocoder, map, infowindow) {
    var lat = document.getElementById('input-stop-lat').value;
    var lng = document.getElementById('input-stop-lon').value;
    
    lat = parseFloat(lat);
    lng = parseFloat(lng);
    
    var latlng = {lat: lat, lng: lng};
    geocoder.geocode({'location': latlng}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      if (results[1]) {
        map.setZoom(11);
        var marker = new google.maps.Marker({
          position: latlng,
          map: map
        });
        infowindow.setContent(results[1].formatted_address);
        infowindow.open(map, marker);
      } else {
        window.alert('No results found');
      }
    } else {
      window.alert('Geocoder failed due to: ' + status);
    }
    });
}

//Add a new stop
function addStop() {
    var stopID,
        stopDate, 
        stopTitle, 
        stopStreet, 
        stopCity, 
        stopPlace, 
        stopDescription, 
        stopLon, 
        stopLat, 
        stopImage,
        stopGallery;

    ++totalStops; 
    currentStop = totalStops;
    console.log(currentStop);
    
    $('#stop-id').text(currentStop);
    
    stopID = currentStop;
    stopTitle = $('#input-stop-title').val();    
    stopPlace = $('#input-stop-place').val();
    stopDate = $('#input-stop-date').val();
    stopDescription = $('#input-stop-description').val();
    stopLon = $('#input-stop-lon').val();
    stopLat = $('#input-stop-lat').val();
    stopStreet = $('#input-stop-street').val();
    stopCity = $('#input-stop-city').val();
    stopImage = $('[name="stop-image"]:checked').val();
    stopGallery = $('[name="stop-gallery"]:checked').val();

    var featuresObj = {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [
            stopLon,
            stopLat
          ]
        },
        "properties": {
          "id": stopID,
          "date": stopDate,
          "title": stopTitle,
          "street": stopStreet,
          "city": stopCity,
          "place": stopPlace,
          "description": stopDescription,
          "image": stopImage,
          "gallery": stopGallery,
          "marker-color": "#4A90E2",
          "marker-size": "large",
          "marker-symbol": "marker"
        }
    };

    //console.log(featuresObj);
        
    createTimeline(stopID, stopDate, stopTitle, stopPlace);
    tripObj.features[tripObj.features.length] = featuresObj;
    
    storeLocal();
    mainScroll.refresh();
}

//Update timeline sidebar information on save of stop
function updateStop(stopID, stopDate, stopTitle, stopPlace) {
    var thisLocation = $('.location:nth-child(' + stopID + ')');
        
    $(thisLocation).find('.stop-date').text(stopDate);
    $(thisLocation).find('.location-name a').text(stopTitle);
    $(thisLocation).find('.location-place').text(stopPlace);
}

//Save an exisiting stop
function saveStop(stopID) {
    var stopDate, 
        stopTitle, 
        stopStreet, 
        stopCity, 
        stopPlace, 
        stopDescription, 
        stopLon, 
        stopLat, 
        stopImage,
        stopGallery;
    
    console.log('current stop is ' + currentStop);

    stopID = currentStop;
    var thisStop = tripObj.features[(stopID - 1)];
    
    stopTitle = $('#input-stop-title').val();    
    stopPlace = $('#input-stop-place').val();
    stopDate = $('#input-stop-date').val();
    stopDescription = $('#input-stop-description').val();
    stopLon = $('#input-stop-lon').val();
    stopLat = $('#input-stop-lat').val();
    stopStreet = $('#input-stop-street').val();
    stopCity = $('#input-stop-city').val();
    stopImage = $('[name="stop-image"]:checked').val();
    stopGallery = $('[name="stop-gallery"]:checked').val();

    thisStop.properties.title = stopTitle;
    thisStop.properties.place = stopPlace;
    thisStop.properties.date = stopDate;
    thisStop.properties.description = stopDescription;
    thisStop.geometry.coordinates[0] = stopLon;
    thisStop.geometry.coordinates[1] = stopLat;
    thisStop.properties.street = stopStreet;
    thisStop.properties.city = stopCity;
    thisStop.properties.image = stopImage;
    thisStop.properties.gallery = stopGallery;

    updateStop(stopID, stopDate, stopTitle, stopPlace);
    
    storeLocal();

    mainScroll.refresh();
}

//View an existing stop 
function viewStop(stopID) {
    var stopDate, 
        stopTitle, 
        stopStreet, 
        stopCity, 
        stopPlace, 
        stopDescription, 
        stopLon, 
        stopLat,
        stopImage,
        stopGallery;
    
    console.log(stopID);

    currentStop = stopID;    
    var thisStop = tripObj.features[(stopID - 1)];
    
    $('#input-stop-search').val();
    google.maps.event.trigger(map, 'resize');
    
    $('#stop-id').text(stopID);

    stopTitle = thisStop.properties.title;
    stopPlace = thisStop.properties.place;
    stopDate = thisStop.properties.date;
    stopDescription = thisStop.properties.description;
    stopStreet = thisStop.properties.street;
    stopCity = thisStop.properties.city;
    
    stopLon = thisStop.geometry.coordinates[0];
    stopLat = thisStop.geometry.coordinates[1];

    $('#input-stop-title').val(stopTitle);
    $('#input-stop-place').val(stopPlace);
    $('#input-stop-date').val(stopDate);
    $('#input-stop-description').val(stopDescription);
    $('#input-stop-lat').val(stopLat);
    $('#input-stop-lon').val(stopLon);
    $('#input-stop-street').val(stopStreet);
    $('#input-stop-city').val(stopCity);

    $("input[name=stop-image][value=" + stopImage + "]").attr('checked', 'checked');
    $("input[name=stop-gallery][value=" + stopGallery + "]").attr('checked', 'checked');


    $('#trip-info').addClass('is-hidden');
    $('#stop-info, #stop-info .button-save, #stop-info .button-add-another').removeClass('is-hidden');

    createMap();    
    mainScroll.refresh();    
}

//Delete stop. Probably needs more work for edge cases
function deleteStop() {
    var index = tripObj.features[(currentStop - 1)];
    tripObj.features.splice(index, 1);
    storeLocal();
        
    $('.location:nth-child(' + currentStop + ')').remove();
}

//Delete the whole object from local storage and start with fresh GEOJSON
function deleteTrip(){
    tripObj = blankTrip;      
    totalStops = 0;
    currentStop = 1;

    storeLocal();
    
    $('#stop-list li').remove();
    $('#sidebar').removeClass('timeline');
}

//Update overview of trip
function saveTrip() {
    tripName = $('#input-trip-name').val();
    tripType = $('#select-trip-type option:selected').val(); 
    tripStartDate = $('#input-trip-start').val();
    tripEndDate = $('#input-trip-end').val();

    $('#trip-name').text(tripName);
    $('#trip-date-start').text(tripStartDate);
    $('#trip-date-end').text(tripEndDate);
    $('.trip-date .divider').removeClass('is-hidden');
        
    tripObj.tripName = tripName;
    tripObj.tripType = tripType;
    tripObj.tripStartDate = tripStartDate;
    tripObj.tripEndDate = tripEndDate;

    storeLocal();
    
    $('#trip-info').addClass('is-hidden');
    $('#stop-info, #stop-info .button-add').removeClass('is-hidden');

    $('#stop-info .datepicker').datepicker('startDate', tripStartDate);    
    
    createMap();
    mainScroll.refresh();
}

//Iniitalize daterange
$('.input-daterange').datepicker({
    format: "M d, yyyy"
});

//Intialize datepicker
$('.datepicker').datepicker({
    format: "M d, yyyy"
});

//ACTIONS

//Show trip overview
$('#button-edit-info').click(function(){    
    $('#trip-info').removeClass('is-hidden');
    $('#stop-info').addClass('is-hidden');    
});

//Save trip information
$('#trip-info .button-save').click(function(){
    saveTrip();    
});

//Add first stop from main overview
$('#stop-info .button-add').click(function(){
    addStop();
 
    $('#stop-info .button-save, #stop-info .button-add-another').removeClass('is-hidden');
    $(this).addClass('is-hidden');
});

//Click function to view existing stop
$(document).on('click', '.location-name a', function() {
   var currentStop = $(this).parents('.location').find('.location-id').data('stop-id');
   stopID = currentStop;
   $(this).parents('.location').addClass('is-current').siblings().removeClass('is-current');

   viewStop(stopID); 
});

//Save existing stop and add new
$('#stop-info .button-add-another').click(function(){
    saveStop(stopID);
 
    currentStop = currentStop + 1;
    $('#stop-id').text(currentStop);
       
    addStop();

    var stopDate = '';
    var stopTitle = 'Stop #' + currentStop;
    var stopPlace = '';
    
    updateStop(currentStop, stopDate, stopTitle, stopPlace);

    $('#stop-info input, #stop-info textarea ').val(null);
    createMap();
    
    mainScroll.scrollTo(0, 0);
});

//Save stop
$('#stop-info .button-save').click(function(){
    saveStop();
});

//Delete the whole trip
$('#button-delete-trip').click(function(){
   deleteTrip(0); 
});

//Delete stop
$('#stop-info .button-delete').click(function(){
    deleteStop(stopID);
});

//Lookup map from latitude and longitude inputs
$('#latlng-lookup').click(function(){
    var geocoder = new google.maps.Geocoder();
    var infowindow = new google.maps.InfoWindow();

    geocodeLatLng(geocoder, map, infowindow);
});

//Initialize stored data
checkLocalStorage();

//Intialize Google Map
google.maps.event.addDomListener(window, 'load', createMap);