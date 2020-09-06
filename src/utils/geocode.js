const request = require('request');


const geo = (address, callback) => {
    locurl = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+address+".json?access_token=pk.eyJ1IjoicGF2YW5sZWUiLCJhIjoiY2tkemRiZGZzM2tkNjJzcGF2OWRvbHY3dCJ9.yNRdS6yG5wup8op_849XKg"
    my_geo_location = request.get({url:locurl,json:true}, (error,response)=>{
    if(error){
        callback("Unable to connect to internet")   
    }
    else if(response.body.features.length === 0) {
        callback("Unable to find location")
    }
    else{
    const latitude = response.body.features[0]["center"][0]
    const longitude = response.body.features[0]["center"][1]
    callback(longitude,latitude)
    }
    })
    }

    module.exports = geo