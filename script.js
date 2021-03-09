
// Get the Weather Data from OpenWeatherMap api
// Expects a City
function getWeather(city){
	// QUSTION? - if city...what? - what is IF checking for here? 
	if (city) 
		{
		// QUESTION? - what would you replace the following with using ES6 methods?
		// tip: perhaps: https://www.w3schools.com/js/js_api_fetch.asp
		// tip: perhaps: get...then...do...something.

		// create a request
		var xhr=new XMLHttpRequest();
		// assign callback
		xhr.onreadystatechange=function()
			{
			// when callback is triggered

			// check that BOTH status and ready state are approprate values
			if (this.status==200 && this.readyState==4) 
				{
				// format the data
				var formattedData=formatWeather(JSON.parse(xhr.responseText));

				// get the elements from the DOM (look at the html!)
				document.getElementById("weather-data").innerHTML=formattedData;
				document.getElementById('cityname').value="";
				}
			// end of callback
			};

	// setup our GET call, REST style, you should use your OWN APP ID!
	xhr.open("GET","http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=d610395e85b50074b834a0234b0776db");
	// send it off to the internet
	xhr.send();	
	}		  
  else	
	  { // ohh...... we got something different here.... what gives? 
		// TIP: What is the value of city? what is the Data type? check these things
  	var error='<div class="alert alert-danger alert-dismissible text-center" role="alert">';
		error+='<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
		error+='You must enter a city name!</div>';
	// show our error on the web page
	document.getElementById('error').innerHTML=error;
  	}
return false;
}

// Format the Weather for output on the Web Page
function formatWeather(data){
	// Since Javascript insert HTML, we can design our page how we want, we are not limited to just what HTML we type in pages. 
	// This is a common pattern. 	
	return "<h3>Current Weather for " + data.name + ", " + data.sys.country + "</h3>" + 
			"<p>Weather: " + data.weather[0].main+ "</p>" + 
			"<p>Weather Description: " + data.weather[0].description +"<img src='http://openweathermap.org/img/w/" + data.weather[0].icon + ".png'/>" + "</p>" + 
			"<p>Temperature: " + data.main.temp + "&deg;C</p>" + 
			"<p>Pressure: " + data.main.pressure + "hPa</p>" + 
			"<p>Humidity: " + data.main.humidity + "%</p>" + 
			"<p>Min Temperature: " + data.main.temp_min + "&deg;C</p>" + 
			"<p>Max Temperature: " + data.main.temp_max + "&deg;C</p>" + 
			"<p>Wind Speed: " + data.wind.speed + "m/s</p>";
}

// Get the forcast for a given city over a number of days
function getForecast(city,days){
	// prepare request
	var xhr=new XMLHttpRequest();
	// setup callback event
	xhr.onreadystatechange=function(){
		// when its triggered check our state
		if (this.status==200 && this.readyState==4) 
			{
			// if all is good, parse the data
			var formattedData=formatForecast(JSON.parse(xhr.responseText));
			// and display it
			document.getElementById("forecast").innerHTML=formattedData;
			document.getElementById('cityname').value="";
			document.getElementById('days').value=""
			}
		};
	// prepare our GET request
	xhr.open("GET","http://api.openweathermap.org/data/2.5/forecast/daily?q="+ city + "&cnt=" + days + "&units=metric&appid=d610395e85b50074b834a0234b0776db");
	// send it off to the web
	xhr.send();
	return false;
	}

// Format the forcast information for display on a page
function formatForecast(data){
	var table=""; // I make an empty string
	// begin a loop thrugh the data, constructing my HTML
	for (var i = 0; i < data.list.length; i++) {
		table += "<tr>";
		table += "<td><img src='http://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png'/></td>";
		table += "<td>" + data.list[i].weather[0].main + "</td>";
		table += "<td>" + data.list[i].weather[0].description + "</td>";
		table += "<td>" + data.list[i].temp.morn + "&deg;C</td>";
		table += "<td>" + data.list[i].temp.night + "&deg;C</td>";
		table += "<td>" + data.list[i].temp.min + "&deg;C</td>";
		table += "<td>" + data.list[i].temp.max + "&deg;C</td>";
		table += "<td>" + data.list[i].pressure + "hPa</td>";
		table += "<td>" + data.list[i].humidity + "%</td>";
		table += "<td>" + data.list[i].speed + "m/s</td>";
		table += "</tr>";
	}
	// and I'm done, return the data
	return table;
}

