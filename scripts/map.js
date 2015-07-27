var map,
    locationList,
    featureLayer,
    markers,
    selectedMarker = 0;

function navBar() {
    
    if (selectedMarker <= 1) {
      $('.map-nav-control a[rel=prev]').addClass('is-hidden'); 
      $('.map-nav-control a[rel=next]').removeClass('is-hidden'); 
      $('.map-nav-control a[rel=begin]').addClass('is-hidden'); 
      $('.map-nav-control a[rel=startover]').addClass('is-hidden'); 
      $('.stop-counter').removeClass('is-hidden');
      //console.log('The BEGINNING');
    }

    else if (selectedMarker === markers.length) {
      $('.map-nav-control a[rel=startover]').removeClass('is-hidden'); 
      $('.map-nav-control a[rel=prev]').removeClass('is-hidden'); 
      $('.map-nav-control a[rel=begin]').addClass('is-hidden'); 
      $('.map-nav-control a[rel=next]').addClass('is-hidden'); 
      //console.log('The END');  
    }
    
    else {
        $('.map-nav-control a[rel=prev]').removeClass('is-hidden'); 
        $('.map-nav-control a[rel=next]').removeClass('is-hidden'); 
        $('.map-nav-control a[rel=startover]').addClass('is-hidden');  
        $('.map-nav-control a[rel=begin]').addClass('is-hidden');
        $('.stop-counter').removeClass('is-hidden');  
        //console.log('The JOURNEY');
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
        //console.log("next, else if statement");       
    }
    
    else {
        i = selectedMarker - 1;
        ++i;    
        map.setView(markers[i].getLatLng(), 8);
        markers[i].openPopup();
        //console.log("next, else statement");
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
    console.log("prev, else statement");
   
    selectedMarker = i + 1;
    navBar();
    
    //console.log("Selected = " + selectedMarker);
    //console.log("i = " + i);
}


L.mapbox.accessToken = 'pk.eyJ1IjoienN0ZWluZXIiLCJhIjoiTXR4U0tyayJ9.6BxBAjPyMHbt1YfD5HWGXA';
    map = L.mapbox.map('map-canvas', 'mapbox.outdoors');

featureLayer = L.mapbox.featureLayer()
    .loadURL('data/co-trip.geojson')
    .addTo(map);

locationList = document.getElementById('location-list');
    
featureLayer.on('ready', function() {
    map.fitBounds(featureLayer.getBounds());

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
              '<header class="info-popup-header with-image" style="background-image: url(images/background-images/background' + locationID + '.jpg);"></header>' +
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
              '<header class="banner-mountain info-popup-header"></header>' + 
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
        
        item.onclick = function() {
            map.setView(layer.getLatLng(), 8);
            layer.openPopup();
            
            selectedMarker = parseInt(locationID, 10);
            navBar();
            
            //console.log("Selected = " + selectedMarker);
        };

        layer.on('click', function() {
            selectedMarker = parseInt(locationID, 10);
            navBar();
            //console.log("Selected = " + selectedMarker);
            
        });
        
    markers = [];
        featureLayer.eachLayer(function(layer) { markers.push(layer); });
    });
});

$('.map-nav-control a[rel=begin]').click(function(){
   next();
});

$('.map-nav-control a[rel=next]').click(function(){
   next();
});

$('.map-nav-control a[rel=prev]').click(function(){
   prev();
});

$('.map-nav-control a[rel=startover]').click(function(){
   next();
});