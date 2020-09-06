const request = require('request');

const forecast = (longitude, latitude, callback) => {
geourl = "http://api.weatherstack.com/current?access_key=489b400e52ec63626028a41098aa75fb&query="+longitude+","+latitude+""
my_location_weather = request.get({url:geourl ,json:true}, (error,response,body)=>{
if(error){
    callback("Unable to connect to Internet services")
}
else if(response.body.error){
    callback("Please specify a valid location identifier using the query parameter.")

}
else{
        callback("Current temparature in ur area is "+response.body.current.temperature+" And the possibility of rain is "+response.body.current.precip)
}
})
}

module.exports = forecast