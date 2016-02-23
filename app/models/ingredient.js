var mongoose = require("mongoose");
var schema = mongoose.Schema;

var ingredientSchema = new schema({
    name: String,
    amount: Number,
    unit: String
});

module.exports = mongoose.model("Ingredient", ingredientSchema);