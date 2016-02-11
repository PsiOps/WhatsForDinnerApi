var mongoose = require("mongoose");
var schema = mongoose.Schema;

var scheduleDaySchema = new schema({
    day: Date,
    recipeId: String,
    recipe: {type: String, ref: 'Recipe'}
});

module.exports = mongoose.model("ScheduleDay", scheduleDaySchema);