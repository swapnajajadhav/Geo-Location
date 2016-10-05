var watchId = null;
$(document).ready(function(){
	if(navigator.geolocation)
	{
		var optn = {
					enableHighAccuracy  : true,
					timeout				: Infinity,
					maximumAge			: 100, // after 100 second it will catch the new location
					
				   }	
		//watch position method(to get users real time position)
		var watchId = navigator.geolocation.watchPosition(success, fail,optn);
		
		//current position method
		//navigator.geolocation.getCurrentPosition(success, fail);
	}
	else
	{
		$("p").html("HTML5 Not Supported");
	}
	
	$("button").click(function(){
		
		if(watchId)
			navigator.geolocation.clearWatch(watchId);
		
		watchId = null;
	});
});

function success(position)
{
	var googleLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	
	var mapOtn 		 = {
						zoom      : 10, //has value between 0-25
						center    : googleLatLng,
						mapTypeId : google.maps.MapTypeId.ROAD //have 3 types of map 1)road 2) satellite 3)hybrid(combination on 1 & 2)
		
					   };
					   
	var pmap         = document.getElementById("map");
	
	var map			 = new google.maps.Map(pmap, mapOtn);
	addMarker(map, googleLatLng, "demo map","swapnaja<br> Jadhav");
	
	//$("p").html("latitude: "+position.coords.latitude+"<br>longitude: "+position.coords.longitude+"<br>accuracy: "+position.coords.accuracy);
}

function addMarker(map, googleLatLng, title,position)
{
	var markerOptn = {
						position : googleLatLng,
						map      : map,
						title    : title,
						animation  : google.maps.Animation.BOUNCE, //.DROP
					 };
	var marker = new google.maps.Marker(markerOptn);
	//var infoWindow = google.maps.InfoWindow({content:content, position:googleLatLng});

	//google.maps.event.addListener(marker, "click", function(){
	//	infoWindow.open(map);
	//});
}

function fail(error)
{
	var errorType ={
			0 : "Unknown Error",
			1 : "Permission Denied by the User",
			2 : "Position of the user not available",
			3 : "Request timmed out"
	};
	var errMsg = errorType[error.code];
	if(error.code == 0 || error.code == 2)
	{
		errMsg = errMsg+" "+error.message;
	}
	$("p").html(errMsg);
}
