var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var mealSchema = mongoose.Schema({
  meal: Array, 
  totalCal: Number, 
  totalProtein: Number, 
  totalFat: Number, 
  totalCarbs: Number
});

var Meal = mongoose.model('Meal', mealSchema);

var selectAll = function(callback) {
  Meal.find({}, function(err, items) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  });
};

module.exports.selectAll = selectAll;
module.exports.Meal = Meal;