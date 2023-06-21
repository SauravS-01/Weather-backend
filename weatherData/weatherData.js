const request = require('request')
const constants = require('../config/config')

const weatherData = (address,callback)=>{
    const url = constants.openWeatherMap.BASE_URL + encodeURIComponent(address) + `&appid=` + constants.openWeatherMap.SECRET_KEY
    request({url,json:true},(error,{body})=>{
        if(error){
            callback(`Can't fetch the data`,undefined)
        } else{
            callback(undefined,{
                temperature: body.main.temp,
                description: body.weather[0].description,
                cityName:body.name,
                humidity: body.main.humidity
            })

        }
    })
}
module.exports= weatherData;