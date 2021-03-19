// Variables
let cityName = 'Vancouver';
let coord = {lon: '-123.1193', lat: '49.2497'};
const t = new Date();
let month = t.getMonth();
let date = t.getDate();
const thirtyOneArr = [0, 2, 4, 6, 7, 9, 11];
const thirtyArr = [3, 5, 8, 10];
const forcastDays = '7';
let unit = 'metric';
let unitShow = '\u00B0C';
const apiKey = '1bfe440130f8c34a9a26a845a5c49429';

// Run these functions initially
getCoordinates(cityName);// Get the coordinates and fetch forcast weather
fetchWeatherData(cityName);

// To switch unit between C & F
function unitSwitch(){
    if(unit == 'metric'){
        unit = 'imperial';
        unitShow = '\u00B0F';
        $('.unitSwitch').empty().append('&#8457;').css('background-color','#1DC690');
    }else{
        unit = 'metric';
        unitShow = '\u00B0C';
        $('.unitSwitch').empty().append('&#8451;').css('background-color','#278AB0');
    }

    getCoordinates(cityName);// Get the coordinates and fetch forcast weather
    fetchWeatherData(cityName);
}

// Run searchCity() by pressing Enter key. 
    
    // document.getElementById('city').addEventListener("keypress", (event)=>{
    //     if(event.keyCode == 13){
    //         searchCity();
    //     }
    // })//(Not working???)

    // Work with jquery
$('#city').keypress((event)=>{
    if(event.which == 13){
        searchCity();
    }
})
 


// Set cityName variables
// Get coordinates for forcast function
// Show current and forcast weather data
function searchCity(){
    cityName = document.getElementById('city').value;
    cityName = cityName.charAt(0).toUpperCase()+cityName.slice(1);//uppercase the first letter of city's name
    getCoordinates(cityName);
    fetchWeatherData(cityName);
}

// Get coordinates info
function getCoordinates(cityName){
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${unit}&appid=${apiKey}`)
    .then(res => {
        if(!res){
            console.log('Somthing Wrong!');
        }
        res.json()
            .then(data => {
                coord.lon = data.coord.lon;
                coord.lat = data.coord.lat;
                fetchForcast(coord, cityName);
            })
    })
}

// Get "current" weather data
function fetchWeatherData(cityName){
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${unit}&appid=${apiKey}`)
    .then(res => {
        if(!res){
            console.log('Somthing Wrong!');
        }
        res.json()
            .then(data => {
                $(document).ready(()=>{
                    if(data.cod == 200){//Showing message if the city's name is wrong
                        $('#mainCity').empty()
                        $('#mainCity').append(`
                            <h3>${data.name}</h3>
                            <ul>
                                <li>Temperature: ${data.main.temp} ${unitShow}</li>
                                <li>Humidity: ${data.main.humidity} %</li>
                                <li>Feels like: ${data.main.feels_like} ${unitShow}</li>
                                <li>Temperature min: ${data.main.temp_min} ${unitShow}</li>
                                <li>Temperature max: ${data.main.temp_max} ${unitShow}</li>
                                <li>Pressure: ${data.main.pressure} hPa</li>
                            </ul>
                            <div>
                                <h4>${data.weather[0].main}</h4>
                                <h6>${data.weather[0].description}</h6>
                            </div>
                        `)
                        $('li').animate({width:'100%', opacity:"1"}, 1000);
                    }else{
                        $('#mainCity').empty()
                        $('#mainCity').append(`<h3>${data.message}</h3>`)
                    }
                })
            })
    })
}

// Get 7 days "forcast" weather data
function fetchForcast(coordinates, cityName){
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&units=${unit}&appid=${apiKey}`)
    .then(res => {
        if(!res){
            console.log('Somthing Wrong!');
        }
        res.json()
            .then(data => {
                console.log(data);//reference
              $(document).ready(()=>{
                    $('.forcastWeatherGroup').empty();
                    $('.cityTitle').empty();

                    $('.cityTitle').text(`${cityName} Forcast`);
                    for(i=1; i<=7; i++){
                        let newDate = date + i;
                        if(thirtyOneArr.includes(month) && newDate > 31){
                            newDate = newDate - 31;
                        }else if(thirtyArr.includes(month) && data > 30){
                            newDate = newDate - 30;
                        }else if(month == 1 && date > 28){
                            newDate = newDate - 28;
                        }// Set further date in forcast

                        $('.forcastWeatherGroup').append(`
                            <div class="forcastWeather">
                                <h3>${month+1} / ${newDate}</h3>
                                <div>
                                    <h4>${data.daily[i].weather[0].main}</h4>
                                    <h6>${data.daily[i].weather[0].description}</h6>
                                </div>
                                <div>
                                    <ul>
                                        <li>Temperature: ${data.daily[i].temp.day} ${unitShow}</li>
                                        <li>Humidity: ${data.daily[i].humidity} %</li>
                                        <li>Pressure: ${data.daily[i].pressure} hPa</li>
                                    </ul>
                                </div>
                            </div>
                        `);
                    }
                    
                })
            })
    })
}

// Update "current" weather data every 2 mins
setInterval(()=>{
    fetchWeatherData(cityName);
    console.log("Weather update");
}, 120000) 


// Scrolling function test
// $(document).scroll(()=>{

//     let aa = $(document).scrollTop();
//     console.log(aa);

// })