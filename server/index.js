var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');

var items = require('../database-mongo');

var app = express();

app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser());

app.post('/cal/imports', function(req, res) {

  //specified by user. 
  //need to make an options object:
  var options = {
    method: 'GET',
    url: `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/mealplans/generate?targetCalories=${req.body.calories}&timeFrame=${req.body.timeFrame}`,
        //https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/mealplans/generate?targetCalories=2000&timeFrame=day"
    
    "X-Mashape-Key": "KUyLEZ1R3ymshjjeyOdPbobao4k8p1kXFyUjsn8zpSUdA3wVXv",
    "Accept": "application/jason"
  }
  request(options, function(err, response, body) {

  })
});

app.get('/items', function (req, res) {
  items.selectAll(function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});



app.listen(3000, function() {
  console.log('listening on port 3000!');
});

