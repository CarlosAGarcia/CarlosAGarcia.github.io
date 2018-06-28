 
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
		music.pause();

		var image = 'alpaca.png';
		var image2 = 'girl.png';
		
		//Button settings. Changes destination/music/animal
		//music.volume = 1;   //change to demo that it's actually working
		if (btn.getAttribute('src')==='alpaca3.png'){
				btn.src = 'alpaca4.png';
				targetPos = {lat: 51.045951, lng: -114.023304}; //Zoo

		} else if (btn.getAttribute('src')==='alpaca4.png') {

				targetPos = {lat: 51.054269, lng: -114.086085}; //Cat cafe
				btn.src = 'jaguar2.png';
				music.src = "cat.mp3";
				image = 'jaguar.png';
				
		} else if (btn.getAttribute('src')==='jaguar2.png') {

				targetPos = {lat: 51.084410, lng: -114.108423}; //Dog Park
				btn.src = 'dog2.png';
				music.src = "dog.mp3";	
				image = 'dog.png';
				
		} else if (btn.getAttribute('src')==='dog2.png') {

				targetPos = {lat: 51.045951, lng: -114.023304}; //Zoo
				music.src = "alpaca.mp3";
				btn.src = 'alpaca4.png';
				image = 'alpaca2.png';
							
		}
		
			
	
		//creates map for calgary with initial markers
		var map = new google.maps.Map(document.getElementById('map'), {
			zoom: 11,
			center: centerYYC
		});

		var marker2 = new google.maps.Marker({
			position: targetPos,
			map: map,
			icon: image
		});

		var marker3 = new google.maps.Marker({
			 position: currentPos,
			 map: null,
			 icon: image2
		 });
				 
		//Sets markers for movement. Gets Location
		if (navigator.geolocation) {
			console.log("GEOOOOOOOOOOOOO");
			setInterval(function () {navigator.geolocation.getCurrentPosition(success, error);}, 3000);	//repeating to check change every second 
	
			//navigator.geolocation.getCurrentPosition(success, error);

		} else {
			alert("Geolocation not possible");
		}


		//updates Markers everytime it's called
		function success(position){
			console.log("Music is paused: "+music.paused);
			
			if(!total){
				totalDistance = Math.pow((targetPos.lat - position.coords.latitude),2) + Math.pow((targetPos.lng - position.coords.longitude),2); //represent a 100% percentage of how far away it is
				total = true;
				console.log("total DIST IS " + totalDistance);
			}

			//if statement about map.zoom
			console.log("VOLUME SHOULD BE "+ music.volume);
			if (latitude != position.coords.latitude || longitude != position.coords.longitude ){
				
				console.log("~~ Distance Update ~~");
				//console.log(totalDistance);

				//identifies current location
				latitude  = position.coords.latitude;
				longitude = position.coords.longitude;

				//LAT AND LNG for testing

				//latitude  = 51.066033;   //further 
				//longitude = -114.112939;
				
				//latitude  = 51.052143;   //louder
				//longitude =  -114.075929;
					
				//changes position of marker
				currentPos.lat = latitude; 
				currentPos.lng = longitude;  						
				marker3.setPosition(currentPos);
				marker3.setMap(map);	
				music.play();
				
				//change volume of music according to how close you are
				distance = Math.pow((targetPos.lat - latitude),2) + Math.pow((targetPos.lng - longitude),2);  //how far away you are now
				console.log("DIST IS " + distance);
				console.log("TARGET - "+targetPos.lat);
					
				percentLeft = 1 - (distance/totalDistance); //percent of the way there in raw distance
				console.log("Percent travelled "+percentLeft);
				if (percentLeft >= 0){
					music.volume = percentLeft;
					console.log("NEW VOLUME SHOULD BE "+ music.volume);
				}

				//console.log("Percent there is "+percentLeft);
				console.log("");

			
			}
				
		}



		function error(){
			console.log("ERROR CANT GET");
			alert("Geolocation was denied");
		}

		

 }
