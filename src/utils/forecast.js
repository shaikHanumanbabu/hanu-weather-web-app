// const request = require('postman-request')
const request = require('request')

const forecast = (lat, lng, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=0e61d2b26ddd9dfa30eba0e76f3944cf&query='+lat+','+lng
    request(url, function (error, response, body) {
          const data = JSON.parse(body)
        //   console.log(data.current.temperature);
        //   console.log(data.current.feelslike);
          callback(undefined, {
              temperature : data.current.temperature,
              feelslike : data.current.feelslike
          })
        });
}


module.exports = forecast
