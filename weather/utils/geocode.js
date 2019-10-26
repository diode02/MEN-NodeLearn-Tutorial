const request = require('request');
const geoCode = (address, callback)=>{
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoicWFza2hhbjAyIiwiYSI6ImNrMjVnbmlweTBsamYzZHA0emU1cGV4NzYifQ.Qd2-iscm3B5xFDSTe0DZfw&limit=1`;

    request({url, json:true},(error,{body})=>{

        if(error){
            callback('unable to connect to location service!',undefined);
        }else if(body.features.length===0){
            callback('unable to find location. Try another search.',undefined);
        }else{
            const {center:cordinates,place_name:place} = body.features[0];
            callback(undefined,{
                longitude: cordinates[0],
                latitude: cordinates[1],
                place
            }); 
        }
    })
}

module.exports = geoCode;