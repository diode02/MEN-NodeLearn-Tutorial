const express = require('express');
const path = require('path');
const app = express();
const geoCode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const publicDir = path.join(__dirname,'../public');
app.set('view engine', 'pug');

app.use(express.static(publicDir));

app.get('',(req, res)=>{
    res.render('index',{
        title:'Node Pug Home',
        address:'lhr',
        author: 'Waqas Khan'
    });
})

app.get('/contact',(req, res)=>{
    res.render('contact',{
        title:'Contact Us',
        address:'lhr',
        author: 'Waqas Khan'
    });
})

app.get('/help',(req, res)=>{
    res.render('help',{
        title:'Help',
        address:'lhr',
        author: 'Waqas Khan'
    });
})

app.get('/weather',(req, res)=>{
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

app.get('/help/*',(req, res)=>{
    res.render('404',{
        title:'Help Topic',
        address:'lhr',
        author: 'Waqas Khan'
    });
})

app.get('*',(req, res)=>{
    res.render('404');
})

app.listen(3000,()=>{
    console.log('Server is up')
})