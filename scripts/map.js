var map,
    locationList,
    featureLayer,
    markers,
    selectedMarker = 0,
    tripName,
    tripType,
    tripStartDate,
    tripEndDate,
    tripData = window.location.hash;
    
    if (tripData === "") {
        tripData = "co-trip";
    }
    
    else {
        tripData = tripData.substr(1);
    }

function navBar() {
    if (selectedMarker <= 1) {
      $('.map-nav-control a[rel=next]').removeClass('is-hidden'); 
      $('.stop-counter').removeClass('is-hidden');
      $('.map-nav-control a[rel=prev]').addClass('is-hidden'); 
      $('.map-nav-control a[rel=begin]').addClass('is-hidden');
      $('.map-nav-control a[rel=startover]').addClass('is-hidden'); 
    }

    else if (selectedMarker === markers.length) {
      $('.map-nav-control a[rel=startover]').removeClass('is-hidden'); 
      $('.map-nav-control a[rel=prev]').removeClass('is-hidden'); 
      $('.map-nav-control a[rel=begin]').addClass('is-hidden'); 
      $('.map-nav-control a[rel=next]').addClass('is-hidden'); 
    }
    
    else {
        $('.map-nav-control a[rel=prev]').removeClass('is-hidden'); 
        $('.map-nav-control a[rel=next]').removeClass('is-hidden'); 
        $('.stop-counter').removeClass('is-hidden');  
        $('.map-nav-control a[rel=startover]').addClass('is-hidden');  
        $('.map-nav-control a[rel=begin]').addClass('is-hidden');
    }

    $('.location:nth-child(' + selectedMarker + ')').addClass('is-current').siblings().removeClass('is-current');
    myScroll.scrollToElement(document.querySelector('.location:nth-child(' + selectedMarker + ')'), 600, null, true);
    $('#stop-number').text(selectedMarker);
}

function next() {
    var i;
        
    if (selectedMarker === markers.length) {
        i = 0;
        map.setView(markers[i].getLatLng(), 8);
        markers[i].openPopup();
    }
    
    else {
        i = selectedMarker - 1;
        ++i;    
        map.setView(markers[i].getLatLng(), 8);
        markers[i].openPopup();
    }
    
    selectedMarker = i + 1;
    navBar();

    //console.log("Selected = " + selectedMarker);
    //console.log("i = " + i);
}

function prev() {
    var i  = selectedMarker - 1;

    --i;
    map.setView(markers[i].getLatLng(), 8);
    markers[i].openPopup();
   
    selectedMarker = i + 1;
    navBar();
    
    //console.log("Selected = " + selectedMarker);
    //console.log("i = " + i);
}

L.mapbox.accessToken = 'pk.eyJ1IjoienN0ZWluZXIiLCJhIjoiTXR4U0tyayJ9.6BxBAjPyMHbt1YfD5HWGXA';
    map = L.mapbox.map('map-canvas', 'mapbox.outdoors');

function mapIt() {
    //featureLayer = {};
    featureLayer = L.mapbox.featureLayer()
        .loadURL('data/' + tripData + '.geojson')
        .addTo(map);
    
    locationList = document.getElementById('location-list');
        
    featureLayer.on('ready', function() {
        map.fitBounds(featureLayer.getBounds());
    
        tripName = featureLayer._geojson.tripName;
        tripType = featureLayer._geojson.tripType;
        tripStartDate = featureLayer._geojson.tripStartDate;
        tripEndDate = featureLayer._geojson.tripEndDate;
        
        $('.trip-name').text(tripName);
        $('.trip-start-date').text(tripStartDate);
        $('.trip-end-date').text(tripEndDate);
        $('.app-header').removeClass().addClass("app-header banner-" + tripType);
        $('.sidebar-header').addClass("sidebar-" + tripType);
        
        featureLayer.eachLayer(function(layer) {
            var item = locationList.appendChild(document.createElement('li'));
    
            
            var locationDate = layer.feature.properties.date,
                locationTitle = layer.feature.properties.title,
                locationID = layer.feature.properties.id,
                locationImage = layer.feature.properties.image,
                locationCity = layer.feature.properties.city,
                locationStreet = layer.feature.properties.street,
                locationDescription = layer.feature.properties.description;
                locationPlace = layer.feature.properties.place;
            
            $(item).addClass('location');
            
            if (locationImage === true) {
                layer.bindPopup(
                  '<header class="info-popup-header with-image" style="background-image: url(images/' + tripData + '/background' + locationID + '.jpg);"></header>' +
                  '<div class="info-popup-header-content">' + 
                      '<div class="location-date"><span class="location-id">Stop #' + locationID + '</span>' + 
                          locationDate + '</div>' +
                      '<h1 class="location-title">' + locationTitle + '</h1>' +
                  '</div>' +
                  '<div class="location-address"><div>' + locationStreet + '</div><div>' + locationCity + '</div></div>' +
                  '<div class="location-description">' + locationDescription + '</div>'
                );
            }
            
            else {
                layer.bindPopup(
                  '<header class="banner-' + tripType + ' info-popup-header"></header>' + 
                  '<div class="info-popup-header-content">' + 
                      '<div class="location-date"><span class="location-id">Stop #' + locationID + '</span>' + 
                          locationDate + '</div>' +
                      '<h1 class="location-title">' + locationTitle + '</h1>' +
                  '</div>' +
                  '<div class="location-address"><div>' + locationStreet + '</div><div>' + locationCity + '</div></div>' +
                  '<div class="location-description">' + locationDescription + '</div>'
                );
            }
            
            item.innerHTML = 
              '<div class="location-date"><span class="location-id">Stop #' + locationID + '</span>' + 
                  locationDate + '</div>' +
                '<div class="location-name"><a>' + locationTitle + '</a></div>' +
                '<div class="location-place">' + locationPlace + '</div>';
            
            $(item).on('click', function() {
                
                map.setView(layer.getLatLng(), 8);
                layer.openPopup();
                
                selectedMarker = locationID;
                navBar();
                
                $('.menu-button').click();
            });
    
            layer.on('click', function() {
                selectedMarker = locationID;
                navBar();
                
            });
            
        markers = [];
            featureLayer.eachLayer(function(layer) { markers.push(layer); });
        });
    });
}

mapIt();

$('.trip-picker').change(function(){
    tripData = $(this).val();
    $('.location').remove();    
    mapIt();
    setTimeout(function(){sidebar();},1000);
});

$('.map-nav-control a[rel=begin], .map-nav-control a[rel=next], .map-nav-control a[rel=startover]').click(function(){
   next();
});

$('.map-nav-control a[rel=prev]').click(function(){
   prev();
});