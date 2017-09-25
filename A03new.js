 
 //initial map    
function initMap() {

		var centerYYC = {lat: 51.048371, lng: -114.071494};

		//creates map for calgary
		var map = new google.maps.Map(document.getElementById('map'), {
			zoom: 11,
			center: centerYYC
		});
	

 }
  

 function change() {
		
		//obtains various necessary positions
	    var currentPos = {lat: 51.077894, lng: -114.135375}; //default is U of C
		var targetPos = {lat: 51.045951, lng: -114.023304};

		var centerYYC = {lat: 51.048371, lng: -114.071494};
		var places = ['alpaca','jaguar', 'dog'];

		var latitude = 0;
		var longitude = 0;

		//variables for distance
		var total = false;
		var totalDistance = 100;
		var distance = 0;
		var percentLeft = 0;

		//variables for button and music
		var btn = document.getElementById('btn');
		var music = document.getElementById('music');

		
		//Button settings. Changes destination/music/animal
		switch (btn.value){
			case "Start": //alpaca face
				btn.value = "Alpaca";
				targetPos = {lat: 51.033404, lng: -114.179467}; //Zoo
				// 51.045951, lng: -114.023304
				break;
			case "Alpaca": //alpaca face
				btn.value = "Jaguar";
				targetPos = {lat: 51.054269, lng: -114.086085}; //Cat cafe
				
				music.src = "cat.mp3";
				break;
			case "Jaguar":
				btn.value = "Dog";
				targetPos = {lat: 51.084410, lng: -114.108423}; //Dog Park
				music.src = "dog.mp3";
				break;
			case "Dog":
				btn.value = "Alpaca";
				targetPos = {lat: 51.045951, lng: -114.023304}; //Zoo
				music.src = "alpaca.mp3";
				break;
			default:
				break;
			
		}
			
	
		//creates map for calgary with initial markers
		var map = new google.maps.Map(document.getElementById('map'), {
			zoom: 11,
			center: centerYYC
		});

		var marker2 = new google.maps.Marker({
			position: targetPos,
			map: map
		});

		var marker3 = new google.maps.Marker({
			 position: currentPos,
			 map: null
		 });
				 
		//Sets markers for movement. Gets Location
		if (navigator.geolocation) {
			console.log("GEOOOOOOOOOOOOO");
			setInterval(function () {navigator.geolocation.getCurrentPosition(success, error);}, 1000);	//repeating to check change every second 
	
			//navigator.geolocation.getCurrentPosition(success, error);

		} else {
			alert("Geolocation not possible");
		}


		//updates Markers everytime it's called
		function success(position){

			music.play();
			music.autoplay = true;
			
			if(!total){
				totalDistance = Math.pow((targetPos.lat - position.coords.latitude),2) + Math.pow((targetPos.lng - position.coords.longitude),2); //represent a 100% percentage of how far away it is
				total = true;
				console.log("total DIST IS " + totalDistance);
			}
			/*
			console.log("Success");
			console.log("current location is "+position.coords.latitude);
			console.log("prev location is "+ latitude);
			console.log("marker location is "+ currentPos.lat);
			console.log("");
			*/

			//if statement about map.zoom
			console.log("VOLUME SHOULD BE "+ music.volume);
			if (latitude != position.coords.latitude || longitude != position.coords.longitude ){
				
				console.log("~~ Distance Update ~~");

				//identifies current location
				latitude  = position.coords.latitude;
				longitude = position.coords.longitude;
					
				//changes position of marker
				currentPos.lat = latitude; 
				currentPos.lng = longitude;  						
				marker3.setPosition(currentPos);
				marker3.setMap(map);	
				
				//change volume of music according to how close you are
				distance = Math.pow((targetPos.lat - latitude),2) + Math.pow((targetPos.lng - longitude),2);  //how far away you are now
				console.log("DIST IS " + distance);

				//if ( 100 - (100 * (distance/totalDistance)) < 0){
				
				//} else{
					
					percentLeft = 1 - (distance/totalDistance); //percent of the way there in raw distance
					if (percentLeft >= 0){
						music.volume = percentLeft;
						console.log("~~~NEWWWWWW VOLUME SHOULD BE "+ music.volume);
					}
					//btn.value= music.volume;
					//console.log("VOLUME SHOULD BE "+ percentLeft);
					//music.volume = percentLeft;//(percentLeft/100);

				//}
				
				//console.log("btn value = "+btn.value);		
				//console.log("DIST is "+distance);
				console.log("Percent there is "+percentLeft);
				console.log("");

			
			}
				
		}



		function error(){
			console.log("ERROR CANT GET");
			alert("Geolocation was denied");
		}

		

 }
