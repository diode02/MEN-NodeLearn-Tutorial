const geoCode = require('./utils/geocode');

// const getWeathe = (longi, leti, callback)=>{
//     const url = `https://api.darksky.net/forecast/2ef79fbdb7b8ec47eaf09ba762e96a89/${encodeURIComponent(longi)},${encodeURIComponent(leti)}`;

//     request({url:url, json:true},(error,response)=>{
//         if(error){
//             callback('unable to connect to weather service!',undefined);
//         }else if(response.body.features.length===0){
//             callback('unable to find weather of this region. Try another search.',undefined);
//         }else{
//             str =  ""
//         }
//     })
// }
geoCode('new york',(error, data)=>{
    console.log(data.place);
})
// getWeathe(le[0], le[1],(error,data)=>{
//     console.log();
// })


// request({url:url, json: true}, (error, response)=>{
//     if(error){
//         console.log("unable to connect");
//     }else if(response.body.code){
//         console.log("unable to fetch location")
//     }else{
//         str = response.body.currently;
//     console.log(str.temperature+" and "+str.precipProbability)
//     }