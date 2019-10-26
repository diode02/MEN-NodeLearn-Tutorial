const express = require('express');
const path = require('path');
const app = express();

const publicDir = path.join(__dirname,'../public');
app.set('view engine', 'pug');

app.use(express.static(publicDir));

app.get('',(req, res)=>{
    res.render('index',{
        name:'waqas',
        address:'lhr'
    });
})

app.get('/contact',(req, res)=>{
    res.render('contact');
})

app.get('/help',(req, res)=>{
    res.render('help');
})

app.get('/weather',(req, res)=>{
    res.send([{
        name: 'lahore',
        weather: 'rain'
    },{
        name: 'karachi',
        weather: 'rain'
    }]);
})

app.get('/help/*',(req, res)=>{
    res.render('404',{
        name: 'Help Topic'
    });
})

app.get('*',(req, res)=>{
    res.render('404');
})

app.listen(3000,()=>{
    console.log('Server is up')
})