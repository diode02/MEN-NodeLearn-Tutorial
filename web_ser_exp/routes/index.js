var express = require('express');
var router = express.Router();
const geoCode = require('../src/utils/geocode');
const forecast = require('../src/utils/forecast');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index',{
    title:'Node Pug Home',
    address:'lhr',
    author: 'Waqas Khan'
  });
});

router.get('/contact',(req, res, next)=>{
  res.render('contact',{
      title:'Contact Us',
      address:'lhr',
      author: 'Waqas Khan'
  });
})

router.get('/help',(req, res)=>{
  res.render('help',{
      title:'Help',
      address:'lhr',
      author: 'Waqas Khan'
  });
})

router.get('/weather',(req, res)=>{
  if(!req.query.address){
      console.log(req.query.address);
      res.send({
          error: 'Please provide a address'
      });
  }else{
      geoCode(req.query.address,(error, {longitude, latitude, place}={})=>{
          if(error){
              return res.send({error});}
          forecast(longitude, latitude,(error,foreData)=>{
              if(error){
                  return res.send({error});
              }
              foreData.place = place;
              res.send(foreData);
          })
      })
  }
})

module.exports = router;
