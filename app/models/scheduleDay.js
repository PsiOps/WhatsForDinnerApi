var mongoose = require("mongoose");
var schema = mongoose.Schema;

var scheduleDaySchema = new schema({
    day: Date,
    recipe: {type: schema.Types.ObjectId, ref: 'Recipe'}
});

module.exports = mongoose.model("ScheduleDay", scheduleDaySchema);