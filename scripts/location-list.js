var options = {
    valueNames: [ 'date', 'location-name','location-street',"location-city","location-place","location-note" ]
};

var locationList = new List('location-list', options, locations);

$('.location:first-of-type').addClass('is-current');