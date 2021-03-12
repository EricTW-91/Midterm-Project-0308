let cityName = 'Vancouver';
let coord = {lon: '-123.1193', lat: '49.2497'};
const t = new Date();
let month = t.getMonth();
let date = t.getDate();
const thirtyOneArr = [0, 2, 4, 6, 7, 9, 11];
const thirtyArr = [3, 5, 8, 10];
const forcastDays = '7';
const unit = 'metric';
const apiKey = '1bfe440130f8c34a9a26a845a5c49429';



fetchWeatherData(cityName);

function searchCity(){
    cityName = document.getElementById('city').value;
    cityName = cityName.charAt(0).toUpperCase()+cityName.slice(1);
    getCoordinates(cityName);
    fetchForcast(coord, cityName);
}

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
            })
    })
}

function fetchWeatherData(cityName){
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${unit}&appid=${apiKey}`)
    .then(res => {
        if(!res){
            console.log('Somthing Wrong!');
        }

        res.json()
            .then(data => {
                console.log(data);//reference
                

                $(document).ready(()=>{
                    if(data.cod == 200){//Showing message if the city's name is wrong
                        $('#mainCity').empty()
                        $('#mainCity').append(`<h3>${data.name}</h3><div><h4>${data.weather[0].main}</h4><h6>${data.weather[0].description}</h6></div><div><h5>Temperature: ${data.main.temp} \u00B0C</h5><h5>Humidity: ${data.main.humidity} %</h5><h5>Pressure: ${data.main.pressure} hPa</h5></div>`)
                    }else{
                        $('#mainCity').empty()
                        $('#mainCity').append(`<h3>${data.message}</h3>`)
                    }
                        
                })
            })
    })
}

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
                        }

                        $('.forcastWeatherGroup').append(`<div class="forcastWeather"><h3>${month+1} / ${newDate}</h3><div><h4>${data.daily[i].weather[0].main}</h4><h6>${data.daily[i].weather[0].description}</h6></div><div><h5>Temperature: ${data.daily[i].temp.day} \u00B0C</h5><h5>Humidity: ${data.daily[i].humidity} %</h5><h5>Pressure: ${data.daily[i].pressure} hPa</h5></div></div>`);
                    }
                    
                })
            })
    })
}





setInterval(()=>{
    // https://eric-tseng.ciccc.tech/Projects/Weather/forcast.html
    if(location.href != 'http://127.0.0.1:5500/dist/forcast.html'){
        fetchWeatherData(cityName);
        console.log("Weather update");
    }//only update data at interval in current and main pages
}, 2000) 

//Fetch defult data once in forcast page
if(location.href == 'http://127.0.0.1:5500/dist/forcast.html'){
    fetchForcast(coord, cityName);
}


let a = 3;
if(a == 0 || a == 2){
    console.log('yes');
}else{
    console.log('no');
}
