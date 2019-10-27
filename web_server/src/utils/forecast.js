const request = require('request');

const forecast = (longitude, letitude, callback)=>{
    let url = `https://api.darksky.net/forecast/2ef79fbdb7b8ec47eaf09ba762e96a89/${encodeURIComponent(longitude)},${encodeURIComponent(letitude)}`;

    request({url, json:true},(error,{body})=>{
        if(error){
            callback('unable to connect to weather service!',undefined);
        }else if(body.error){
            callback('unable to find weather of this region. Try another search.',undefined);
        }else{
            const {summary, temperature, precipProbability:rainProbability} = body.currently;
            callback(undefined, {
                summary,
                temperature,
                rainProbability
            })
        }
    })
}

module.exports = forecast;