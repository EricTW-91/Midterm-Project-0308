let cityName = 'vancouver';
const forcastDays = '7';
const apiKey = '1bfe440130f8c34a9a26a845a5c49429';

fetchWeatherData(cityName);

function searchCity(){
    cityName = document.getElementById('city').value;
    fetchWeatherData(cityName);
}

function fetchWeatherData(cityName){
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`)
    .then(res => {
        if(!res){
            console.log('Somthing Wrong!');
        }

        res.json()
            .then(data => {
                console.log(data);//reference


                $(document).ready(()=>{
                    if(data.cod == 200){
                        $('#mainCity').empty()

                        let celsius = data.main.temp - 273.15;

                        $('#mainCity').append(`<h3>${data.name}</h3><div><h4>${data.weather[0].main}</h4><h6>${data.weather[0].description}</h6></div><div><h5>Temperature: ${celsius.toFixed(2)} \u00B0C</h5><h5>Humidity: ${data.main.humidity} %</h5><h5>Pressure: ${data.main.pressure} hPa</h5></div>`)
                    }else{
                        $('#mainCity').empty()
                        $('#mainCity').append(`<h3>${data.message}</h3>`)
                    }
                        
                })
            })
    })
}

function fetchForcast(cityName){
    fetch(`http://api.openweathermap.org/data/2.5/forecast/daily?q=${cityName}&cnt=${forcastDays}&appid=${apiKey}`)
    .then(res => {
        if(!res){
            console.log('Somthing Wrong!');
        }

        res.json()
            .then(data => {
                // console.log(data);//reference


                $(document).ready(()=>{
                    if(data.cod == 200){
                        $('#weatherForcast').empty()
                        $('#weatherForcast').append(`<h3>${data.name}</h3><div><h4>${data.weather[0].main}</h4><h6>${data.weather[0].description}</h6></div><div><h5>Temperature: ${data.main.temp}</h5><h5>Humidity: ${data.main.humidity}</h5><h5>Pressure: ${data.main.pressure}</h5></div>`)
                    }else{
                        $('#weatherForcast').empty()
                        $('#weatherForcast').append(`<h3>${data.message}</h3>`)
                    }
                        
                })
            })
    })
}





setInterval(()=>{
    fetchWeatherData(cityName);
    console.log("Weather update")

    fetchForcast(cityName);
}, 2000) 