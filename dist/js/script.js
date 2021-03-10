fetch('http://api.openweathermap.org/data/2.5/forecast?id=524901&appid={1bfe440130f8c34a9a26a845a5c49429}')
    .then(res => {
        if(!res){
            console.log('Somthing Wrong!');
        }

        res.json()
            .then(data => {
                console.log(data[0]);
            })
    })