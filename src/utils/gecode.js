// const request = require('postman-request')
const request = require('request')
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent( address)+'.json?access_token=pk.eyJ1IjoiaGFudW1hbi0xMjMiLCJhIjoiY2p6bm0wOHd1MDU3MTNpbHZxeWtqZzY0cyJ9.pZh50Qu3MFIsxFLKraJIFw&limit=1';
    request(url, (error, body) => {
        const data =  JSON.parse(body.body);
        // const data = JSON.parse(body)
        if(error) {
            callback('unable to connect locations services', undefined)
        } else if (data.features.length == 0) {
            callback('unable to  fetch locations services', undefined)
        } else {
             callback(undefined, {
                 lati : data.features[0].center[1],
                 lang : data.features[0].center[0],
                 location: data.features[0].place_name
             })
        }
    })
}

module.exports = geocode