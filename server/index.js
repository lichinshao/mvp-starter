var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');

var meals = require('../database-mongo');
var Meal = require('../database-mongo');

var app = express();

app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser());

app.post('/cal/imports', function(req, res) {
  var options = {
    method: 'GET',
    url: `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/mealplans/generate?targetCalories=${req.body.cal}&timeFrame=day`,
    headers: {
      "X-Mashape-Key": "KUyLEZ1R3ymshjjeyOdPbobao4k8p1kXFyUjsn8zpSUdA3wVXv",
      "Accept": "application/json"
    } 
  }
  request(options, function(err, response, body) {
    console.log('in request', body);
    var data = JSON.parse(body);
    var dailyMeal = data.meals;
    var totalCal = data.nutrients.calories;
    var totalPro = data.nutrients.protein;
    var totalFat = data.nutrients.fat;
    var totalCarbs = data.nutrients.carbohydrates;
    var mealPlan = new Meal.Meal({
      meal: dailyMeal,
      totalCal: totalCal,
      totalProtein: totalPro,
      totalFat: totalFat,
      totalCarbs: totalCarbs
    });
    mealPlan.save();
    res.status(201).send(body);
    res.end();
  })
});

app.get('/items', function (req, res) {
  meals.selectAll(function(err, data) {
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

