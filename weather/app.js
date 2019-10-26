const geoCode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const argv = process.argv;

if(argv[2]){
    geoCode(argv[2],(error, {longitude, latitude, place})=>{
        if(error)
            return console.log(error)
        forecast(longitude, latitude,(error,foreData)=>{
            if(error)
                return console.log(error);
            console.log(`data for city = ${place} \n ${foreData}`);
        })
    })
}
else{
    console.log("give location")
}