const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const request = require('request');
const baseUrl = 'http://dataservice.accuweather.com/currentconditions/v1/';
const locationCode = '299061'; //location code = giyani
const apiID = '9ulLquNYRUARn3Pzvo8oawjvkJeeJE7G';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extend:true}));

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.render('index', {weather: null, error: null});
});

app.post('/', function(req, res){
  let url = baseUrl + locationCode + '?apikey=' + apiID; //set url

  request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Oops, something happened please try again'});
    }
    else {
      let weather = JSON.parse(body);

      if(weather[0].WeatherText == undefined)
      {
        res.render('index', {weather: null, error: 'Oops, something happened please try again'});
      }
      else {
        res.render('index', {weather: weather[0], error: null});
      }
    }
  });
});

app.listen(3000, function(){
    console.log('Weather App is listening on localhost:3000');
});
