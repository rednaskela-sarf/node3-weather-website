const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=84e8f0a3b9939f67710472c1360d280c&query='
    + encodeURIComponent(latitude) + ',' 
    + encodeURIComponent(longitude) + '&units=m'

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (response.body.error) {
            callback('Unable to find location', undefined)
        } else {
            //console.log(response.body)
            callback(undefined, 
                response.body.location.country + ', ' + response.body.location.name + ', ' + response.body.location.region + ', ' + response.body.request.query + ", " +  
                "Weather description: " + response.body.current.weather_descriptions[0]+ ", " +
                "Temperature: " + response.body.current.temperature + ", " +
                "Humididty: " + response.body.current.humidity + ", " +
                "Pressure: " + response.body.current.pressure + ", " +
                "Wind speed: " + response.body.current.wind_speed + ", " +
                "Wind direction: " + response.body.current.wind_dir + "."
                )
        }
    })
}

module.exports = forecast