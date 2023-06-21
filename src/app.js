const express = require('express');
const req = require('express/lib/request');
const weatherData= require('../weatherData/weatherData')
const app = express();

const hbs = require('hbs');
const path = require('path');

const port = process.env.PORT || 3000;

// specifying the path to our public folder having static assets
const publicStaticDirPath = path.join(__dirname,'../public')

const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

app.set('view engine','hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath)

app.use(express.static(publicStaticDirPath))
// create a default route for our server
app.get('/',(req,res)=>{
    //res.send("This is the default Route..")
    res.render('index',{
        title: 'Weather App'
    })
})
app.get('/weather', (req,res) => {
    const address = req.query.address

    if(address === '' ){

        console.log("add",address)
        return res.send({
            error: "Please enter a valid location to search weather"
        })
     }
   weatherData(address,(error, {errorln,temperature, description,cityName,humidity}) => {
       if(errorln){
           return res.send({
               error:"City not found!"
           })
       } 
       console.log(temperature,description,cityName,humidity)
       res.send({
           temperature,
           description,
           cityName,
           humidity
       })
   })
})

// route if a page doesnot exist (404)
app.get('*',(req,res) => {
    // res.send('This is page not found endpoint')
    res.render('404', {
        title: 'Page not Found'
    })
})
app.listen(port,()=>{
    console.log("Server is up and running on port:", port)
});