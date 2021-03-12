
let cityName = 'vancouver';

function searchCity(){
    cityName = document.getElementById('city').value;
    console.log(cityName);
}

setInterval(()=>{
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=1bfe440130f8c34a9a26a845a5c49429`)
    .then(res => {
        if(!res){
            console.log('Somthing Wrong!');
        }

        res.json()
            .then(data => {
                console.log(data.message);//reference


                $(document).ready(()=>{
                    if(data.cod == 200){
                        $('#mainCity').empty()
                        $('#mainCity').append(`<h3>${data.name}</h3><div><h4>${data.weather[0].main}</h4><h6>${data.weather[0].description}</h6></div><div><h5>Temperature: ${data.main.temp}</h5><h5>Humidity: ${data.main.humidity}</h5><h5>Pressure: ${data.main.pressure}</h5></div>`)
                    }else{
                        $('#mainCity').empty()
                        $('#mainCity').append(`<h3>${data.message}</h3>`)
                    }
                        
                })
            })
    })
}, 2000) 

