var locations = [
  {
    date:"Jun 28, 2015",
    name:"Madeline Hotel",
    street:"568 Mountain Village Blvd",
    city:"Telluride, CO  81435",
    place:"Telluride",
    note:"Amazing views coming into Mountain Village. First time in Telluride, so had zero expectations for the hotel, but it was much fancier than our typical hotel. The views, oh the views ... ",
    image: "02village"
  },
  {
    date:"Jun 28, 2015",
    name:"Dinner at there",
    street:"627 W Pacific Ave",
    city:"Telluride, CO  81435",
    place:"Telluride",
    note:"Took the gondola down to Telluride and there blew away our expectations for both the restaurant and beef tongue. The gondola after dark is very peaceful.",
    image: "03gondola"
  },
  {
    date:"Jun 29, 2015",
    name:"Hike Wilson Meadow Trail",
    street:"",
    city:"Ophir, CO",
    place:"Outside Telluride",
    note:"The Sound of Music meadow was worth the pain in my legs and that ugly hill.",
    image: "04meadow"
  },
  {
    date:"Jun 29, 2015",
    name:"Lunch at Floradora Saloon",
    street:"103 W Colorado Ave",
    city:"Telluride, CO  81435",
    place:"Telluride",
    note:"After 4 hours of hiking, a giant hamburger and beer is deserved.",
    image: ""
  },
  {
    date:"Jun 29, 2015",
    name:"Black Canyon Motel",
    street:"1605 E Main St",
    city:"Montrose, CO 81401",
    place:"Montrose",
    note:"Quiet night at the pool and early to bed.",
    image: ""    
  },
  {
    date:"Jun 30, 2015",
    name:"Hikes at Black Canyon of the Gunnison National Park",
    street:"10346 CO 347",
    city:"Montrose, CO 81401",
    place:"Montrose",
    note:"Stunning views and saw everything from aspen stands to desert with cacti in bloom. Saw a bull snake on the trail; played it safe and let it pass (looked a lot like a rattle snake). Topped off by a beer overlooking the canyon.",
    image: "06"
  },
  {
    date:"Jun 30, 2015",
    name:"Colorado Timberline Academy Cabins",
    street:"35554 US-550",
    city:"Durango, CO 81301",
    place:"Durango",
    note:"Several wonderful days in Durango.",
    image: ""
  },
  {
    date:"Jun 30, 2015",
    name:"Dinner at Macho's",
    street:"1485 Florida Rd",
    city:"Durango, CO 81301",
    place:"Durango",
    note:"Avocado margaritas and ceviche.",
    image: ""
  },
  {
    date:"Jul 1, 2015",
    name:"Breakfast at Durango Doughworks",
    street:"2653 Main Ave",
    city:"Durango, CO 81301",
    place:"Durango",
    note:"Of course onion rings make a great side for omelets.",
    image: ""
  },
  {
    date:"Jul 1, 2015",
    name:"Playing at Haviland Lake",
    street:"Haviland Lake Rd",
    city:"Durango, CO 81301",
    place:"Durango",
    note:"Not a kayaker, but got to play with the dog and relax lakeside before the storm came in.",
    image: ""
  },
  {
    date:"Jul 1, 2015",
    name:"Dinner at Eolus",
    street:"919 Main Ave",
    city:"Durango, CO 81301",
    place:"Durango",
    note:"Farewell dinner before leaving the next day.",
    image: ""
  },
  {
    date:"Jul 2, 2015",
    name:"Attempted Lunch at Freeman's General Store",
    street:"39354 CO-149",
    city:"Creede, CO 81130",
    place:"Outside Creede",
    note:"Torrential down pour coming in. Cash only and no ATM; nearest was 20 miles back in Creede. Will have to wait to taste their famous burgers. Continued on to Lake City.",
    image: ""
  },
  {
    date:"Jul 2, 2015",
    name:"Alferd Packer Massacre Site",
    street:"",
    city:"",
    lat: "37.999209",
    lng: "-107.2936436",
    place:"Outside Lake City",
    note:"Slammed on the breaks and took advantage of the photo op. 'Now that I'm a trapper, I'm the meanest guy around. Second meanest!'",
    image: "13packer"
  },
  {
    date:"Jul 2, 2015",
    name:"Lunch at Restless Spirits Saloon",
    street:"300 Silver Street",
    //street:"",
    city:"Lake City, CO 81235",
    place:"Lake City",
    note:"Consolation prize for lunch, but great little place.",
    image: ""
  },
  {
    date:"Jul 2, 2015",
    name:"Long Holiday Motel",
    street:"1198 W US Highway 50",
    city:"Gunnison, CO 81230",
    place:"Gunnison",
    note:"We will now forever pick our motels based on quality of their mid-century sign. Full of Twin Peaks charm.",
    image: "15longholiday"
  },
  {
    date:"Jul 2, 2015",
    name:"Strolled around downtown",
    street:"",
    city:"Gunnison, CO 81230",
    place:"Gunnison",
    note:"Walked around downtown Gunnison, which doesn't take long. Then had ice cream.",
    image: ""
  },
  {
    date:"Jul 2, 2015",
    name:"Creekside Beers in Gunnison National Forest",
    street:"",
    city:"",
    place:"Gunnison National Forest",
    lat:"38.731456",
    lng:"-106.757503",
    note:"Drove up outside of Gunnison to have a beer and enjoy more nature. Found a lovely spot along the creek.",
    image: "17creek"
  },
  {
    date:"Jul 2, 2015",
    name:"Pizza from Mario's",
    street:"213 W Tomichi Ave",
    city:"Gunnison, CO 81230",
    place:"Gunnison",
    note:"After the drive into the forest, chilled out and ordered delivery. Great pizza.",
    image: ""
  },
  {
    date:"Jul 3, 2015",
    name:"Breakfast at W Cafe",
    street:"114 N Main St",
    city:"Gunnison, CO 81230",
    place:"Gunnison",
    note:"Great breakfastOld at an school diner before hitting the road.",
    image: ""
  },
  {
    date:"Jul 3, 2015",
    name:"Stop in Crested Butte",
    street:"Crested Butte, CO",
    city:"Crested Butte, CO",
    place:"Crested Butte",
    note:"Took the scenic route through Crested Butte rather than 285 up through Leadville. Crested Butte is a charming little mountain town, as many of them are. Took 135 to County Rd 12 to CO 133 through Carbondale and Glenwood Springs",
    image: ""
  },
  {
    date:"Jul 3, 2015",
    name:"Stop in Carbondale",
    street:"",
    city:"Carbondale, CO",
    place:"Carbondale",
    note:"The 'West Elk Loop' (County Rd 12) was very scenic, but was a dirt road. Slow going, but beautiful. Glad it was summer.",
    image: ""
  },
  {
    date:"Jul 3, 2015",
    name:"Stop in Glenwood Springs",
    street:"",
    city:"Glenwood Springs, CO",
    place:"Glenwood Springs",
    note:"Back to I-70.",
    image: ""
  },
  {
    date:"Jul 3, 2015",
    name:"Return to Eagle Airport",
    street:"219 Eldon Wilson Rd",
    city:"Gypsum, CO 81637",
    place:"Gypsum",
    note:"Dropped the car off. Man was it hot.",
    image: ""
  },
  {
    date:"Jul 3, 2015",
    name:"Avon Fireworks",
    street:"40 Village Rd",
    city:"Avon, CO 81620",
    place:"Near Beaver Creek",
    note:"Camped out near the car with children running around. The fireworks were lovely.",
    image: ""
  },
  {
    date:"Jul 4, 2015",
    name:"Leave from Denver International Airport",
    street:"8500 Peña Blvd",
    city:"Denver, CO 80249",
    place:"Denver",
    note:"Flight was delayed, so we enjoyed great beers and dinner at Root Down.",
    image: ""
  }
];
